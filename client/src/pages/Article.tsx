import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";
import { Link } from "wouter";
import Footer from "@/components/Footer";

export default function Article() {
  const [match, params] = useRoute("/resources/:slug");
  
  const { data: article, isLoading, error } = useQuery({
    queryKey: ['/api/articles', params?.slug],
    enabled: !!params?.slug,
  });

  if (isLoading) {
    return (
      <div className="pt-16 min-h-screen bg-gradient-to-b from-gray-50/60 to-white/90 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="pt-16 min-h-screen bg-gradient-to-b from-gray-50/60 to-white/90 flex items-center justify-center">
        <Card className="bg-white/95 border-gray-400 shadow-lg max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 text-black">Article Not Found</h2>
            <p className="text-gray-700 mb-6">
              Sorry, we couldn't find the article you're looking for.
            </p>
            <Link href="/resources">
              <Button className="bg-black hover:bg-gray-800 text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Resources
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatContent = (content: string) => {
    return content
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-6 text-black">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mb-4 mt-8 text-black">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mb-3 mt-6 text-black">$1</h3>')
      .replace(/^\- (.*$)/gim, '<li class="ml-4 mb-2">$1</li>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline">$1</a>');
  };

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-b from-gray-50/60 to-white/90">
      {/* Header */}
      <section className="py-12 bg-gradient-to-br from-white/90 via-gray-50/80 to-white/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/resources">
            <Button variant="outline" className="mb-8 border-black text-black hover:bg-black hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Resources
            </Button>
          </Link>
          
          <div className="mb-6">
            <Badge className="bg-black text-white mb-4">
              {article.category === 'guides' ? 'Guide' : 'Article'}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-black leading-tight">
              {article.title}
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              {article.excerpt}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              <span>{article.authorName}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span>{article.readTime}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
            </div>
          </div>

          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {article.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="border-gray-400 text-gray-700">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-white/95 border-gray-400 shadow-lg">
            <CardContent className="p-8 md:p-12">
              <div 
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formatContent(article.content) }}
              />
              
              {/* Call to Action */}
              <div className="mt-12 p-8 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold mb-4 text-black">Ready to Transform Your Business Technology?</h3>
                <p className="text-gray-700 mb-6">
                  Don't let technology challenges hold your business back. Let's discuss how we can help you implement the solutions outlined in this article.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/book-call">
                    <Button className="bg-black hover:bg-gray-800 text-white">
                      Schedule Free Consultation
                    </Button>
                  </Link>
                  <Link href="/resources">
                    <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white">
                      Read More Articles
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}