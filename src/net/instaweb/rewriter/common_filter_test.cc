/*
 * Copyright 2010 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Author: sligocki@google.com (Shawn Ligocki)

#include "net/instaweb/rewriter/public/common_filter.h"

#include "base/scoped_ptr.h"
#include "net/instaweb/htmlparse/public/html_parse.h"
#include "net/instaweb/rewriter/public/resource_manager_test_base.h"
#include "net/instaweb/util/public/google_message_handler.h"

namespace net_instaweb {

namespace {

class CountingFilter : public CommonFilter {
 public:
  CountingFilter(RewriteDriver* driver) : CommonFilter(driver),
                                          start_doc_calls_(0),
                                          start_element_calls_(0),
                                          end_element_calls_(0) {}

  virtual void StartDocumentImpl() { ++start_doc_calls_; }
  virtual void StartElementImpl(HtmlElement* element) {
    ++start_element_calls_;
  }
  virtual void EndElementImpl(HtmlElement* element) { ++end_element_calls_; }

  virtual const char* Name() const { return "CommonFilterTest.CountingFilter"; }

  int start_doc_calls_;
  int start_element_calls_;
  int end_element_calls_;
};

class CommonFilterTest : public ResourceManagerTestBase {
 protected:
  CommonFilterTest() : filter_(&rewrite_driver_) {
    rewrite_driver_.AddFilter(&filter_);
  }

  void ExpectUrl(const std::string& expected_url, const GURL& actual_gurl) {
    LOG(INFO) << actual_gurl;
    EXPECT_EQ(expected_url, GoogleUrl::Spec(actual_gurl));
  }

  bool CanRewriteResource(CommonFilter* filter, const StringPiece& url) {
    scoped_ptr<Resource> resource(filter->CreateInputResource(url));
    return (resource.get() != NULL);
  }

  CommonFilter* MakeFilter(const StringPiece& base_url,
                           const StringPiece& domain,
                           RewriteOptions* options,
                           RewriteDriver* driver) {
    options->domain_lawyer()->AddDomain(domain, &message_handler_);
    CountingFilter* filter = new CountingFilter(driver);
    driver->AddOwnedFilter(filter);
    driver->StartParse(base_url);
    driver->Flush();
    return filter;
  }

  GoogleMessageHandler handler_;
  HtmlParse* html_parse_;
  CountingFilter filter_;
};

TEST_F(CommonFilterTest, DoesCallImpls) {
  EXPECT_EQ(0, filter_.start_doc_calls_);
  filter_.StartDocument();
  EXPECT_EQ(1, filter_.start_doc_calls_);

  HtmlElement* element = rewrite_driver_.NewElement(NULL, "foo");
  EXPECT_EQ(0, filter_.start_element_calls_);
  filter_.StartElement(element);
  EXPECT_EQ(1, filter_.start_element_calls_);

  EXPECT_EQ(0, filter_.end_element_calls_);
  filter_.EndElement(element);
  EXPECT_EQ(1, filter_.end_element_calls_);
}

TEST_F(CommonFilterTest, StoresCorrectBaseUrl) {
  std::string doc_url = "http://www.example.com/";
  rewrite_driver_.StartParse(doc_url);
  rewrite_driver_.Flush();
  // Base URL starts out as document URL.
  ExpectUrl(doc_url, rewrite_driver_.gurl());
  ExpectUrl(doc_url, filter_.base_gurl());

  rewrite_driver_.ParseText(
      "<html><head><link rel='stylesheet' href='foo.css'>");
  rewrite_driver_.Flush();
  ExpectUrl(doc_url, filter_.base_gurl());

  std::string base_url = "http://www.baseurl.com/foo/";
  rewrite_driver_.ParseText("<base href='");
  rewrite_driver_.ParseText(base_url);
  rewrite_driver_.ParseText("' />");
  rewrite_driver_.Flush();
  // Update to base URL.
  ExpectUrl(base_url, filter_.base_gurl());
  // Make sure we didn't change the document URL.
  ExpectUrl(doc_url, rewrite_driver_.gurl());

  rewrite_driver_.ParseText("<link rel='stylesheet' href='foo.css'>");
  rewrite_driver_.Flush();
  ExpectUrl(base_url, filter_.base_gurl());

  std::string new_base_url = "http://www.somewhere-else.com/";
  rewrite_driver_.ParseText("<base href='");
  rewrite_driver_.ParseText(new_base_url);
  rewrite_driver_.ParseText("' />");
  rewrite_driver_.Flush();
  // Uses new base URL.
  ExpectUrl(new_base_url, filter_.base_gurl());

  rewrite_driver_.ParseText("</head></html>");
  rewrite_driver_.FinishParse();
  ExpectUrl(new_base_url, filter_.base_gurl());
  ExpectUrl(doc_url, rewrite_driver_.gurl());
}

TEST_F(CommonFilterTest, DetectsNoScriptCorrectly) {
  std::string doc_url = "http://www.example.com/";
  rewrite_driver_.StartParse(doc_url);
  rewrite_driver_.Flush();
  EXPECT_TRUE(filter_.noscript_element() == NULL);

  rewrite_driver_.ParseText("<html><head><title>Example Site");
  rewrite_driver_.Flush();
  EXPECT_TRUE(filter_.noscript_element() == NULL);

  rewrite_driver_.ParseText("</title><noscript>");
  rewrite_driver_.Flush();
  EXPECT_TRUE(filter_.noscript_element() != NULL);

  // Nested <noscript> elements
  rewrite_driver_.ParseText("Blah blah blah <noscript><noscript> do-de-do-do ");
  rewrite_driver_.Flush();
  EXPECT_TRUE(filter_.noscript_element() != NULL);

  rewrite_driver_.ParseText("<link href='style.css'>");
  rewrite_driver_.Flush();
  EXPECT_TRUE(filter_.noscript_element() != NULL);

  // Close inner <noscript>s
  rewrite_driver_.ParseText("</noscript></noscript>");
  rewrite_driver_.Flush();
  EXPECT_TRUE(filter_.noscript_element() != NULL);

  // Close outter <noscript>
  rewrite_driver_.ParseText("</noscript>");
  rewrite_driver_.Flush();
  EXPECT_TRUE(filter_.noscript_element() == NULL);

  rewrite_driver_.ParseText("</head></html>");
  rewrite_driver_.FinishParse();
  EXPECT_TRUE(filter_.noscript_element() == NULL);

}

TEST_F(CommonFilterTest, TestTwoDomainLawyers) {
  static const char kBaseUrl[] = "http://www.base.com/";
  CommonFilter* a = MakeFilter(kBaseUrl, "a.com", &options_, &rewrite_driver_);
  CommonFilter* b = MakeFilter(kBaseUrl, "b.com", &other_options_,
                               &other_rewrite_driver_);

  // Either filter can rewrite resources from the base URL
  EXPECT_TRUE(CanRewriteResource(a, StrCat(kBaseUrl, "base.css")));
  EXPECT_TRUE(CanRewriteResource(b, StrCat(kBaseUrl, "base.css")));

  // But the other domains are specific to the two different drivers/filters
  EXPECT_TRUE(CanRewriteResource(a, "http://a.com/a.css"));
  EXPECT_FALSE(CanRewriteResource(a, "http://b.com/b.css"));
  EXPECT_FALSE(CanRewriteResource(b, "http://a.com/a.css"));
  EXPECT_TRUE(CanRewriteResource(b, "http://b.com/b.css"));
}

}  // namespace

}  // namespace net_instaweb
