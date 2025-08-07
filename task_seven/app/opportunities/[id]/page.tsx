import { Suspense } from "react"
import JobDetailPage from "@/components/job-detail-page"
import { Card } from "@/components/ui/card"

interface PageProps {
  params: {
    id: string
  }
}

export default function OpportunityDetail({ params }: PageProps) {
  return (
    <main className="min-h-screen bg-gray-50">
      <Suspense
        fallback={
          <div className="container mx-auto px-4 py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-24 mb-8"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-8"></div>
                  <div className="h-6 bg-gray-200 rounded w-40 mb-4"></div>
                  <div className="h-32 bg-gray-200 rounded mb-8"></div>
                </div>
                <div>
                  <Card className="p-6">
                    <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
                    <div className="space-y-4">
                      {[...Array(4)].map((_, i) => (
                        <div key={i}>
                          <div className="h-4 bg-gray-200 rounded w-20 mb-1"></div>
                          <div className="h-3 bg-gray-200 rounded w-32"></div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        }
      >
        <JobDetailPage opportunityId={params.id} />
      </Suspense>
    </main>
  )
}
