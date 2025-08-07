"use client"
import Image from "next/image"
import type { Job } from "@/types/job"


interface JobCardProps {
  job: Job
  onClick?: () => void
}

export default function JobCard({ job, onClick }: JobCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "in person":
        return "bg-green-100 text-green-700 border-green-200"
      case "remote":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "hybrid":
        return "bg-purple-100 text-purple-700 border-purple-200"
      case "marketing":
        return "bg-orange-100 text-orange-700 border-orange-200"
      case "education":
        return "bg-orange-100 text-orange-700 border-orange-200"
      case "design":
      case "art":
        return "bg-pink-100 text-pink-700 border-pink-200"
      case "it":
      case "development":
      case "technology":
        return "bg-gray-100 text-gray-700 border-gray-200"
      case "data science":
      case "analytics":
        return "bg-indigo-100 text-indigo-700 border-indigo-200"
      case "customer service":
      case "support":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getCompanyLogoImage = (title: string, company: string) => {
    // Map job titles to specific logo images
    const titleLower = title.toLowerCase()

    if (titleLower.includes("social media")) {
      return "/images/social-media-logo.png"
    } else if (titleLower.includes("web developer") || titleLower.includes("developer")) {
      return "/images/web-dev-logo.png"
    } else if (titleLower.includes("graphic designer") || titleLower.includes("designer")) {
      return "/images/design-logo.png"
    } else if (titleLower.includes("data analyst") || titleLower.includes("data")) {
      return "/images/data-logo.png"
    } else if (titleLower.includes("customer support") || titleLower.includes("support")) {
      return "/images/support-logo.png"
    } else {
      return "/images/default-logo.png"
    }
  }

  const getCompanyLogoFallback = (company: string) => {
    // Fallback colors and text for when image fails to load
    const colors = [
      { bg: "bg-yellow-500", textColor: "text-white" },
      { bg: "bg-blue-600", textColor: "text-white" },
      { bg: "bg-pink-500", textColor: "text-white" },
      { bg: "bg-purple-600", textColor: "text-white" },
      { bg: "bg-green-500", textColor: "text-white" },
      { bg: "bg-red-500", textColor: "text-white" },
      { bg: "bg-indigo-600", textColor: "text-white" },
      { bg: "bg-teal-500", textColor: "text-white" },
    ]

    const colorIndex = company.length % colors.length
    const selectedColor = colors[colorIndex]

    return {
      bg: selectedColor.bg,
      text: company
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
      textColor: selectedColor.textColor,
    }
  }

  const logoImage = getCompanyLogoImage(job.title, job.company)
  const fallbackInfo = getCompanyLogoFallback(job.company)

  return (
    <div
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer mb-4"
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 relative bg-gray-100">
          <Image
            src={logoImage || "/placeholder.svg"}
            alt={`${job.company} logo`}
            width={48}
            height={48}
            className="rounded-full object-cover w-full h-full"
            onError={(e) => {
              // Hide the image and show fallback
              e.currentTarget.style.display = "none"
              const fallback = e.currentTarget.nextElementSibling as HTMLElement
              if (fallback) {
                fallback.style.display = "flex"
              }
            }}
          />
          {/* Fallback logo */}
          <div
            className={`absolute inset-0 ${fallbackInfo.bg} rounded-full flex items-center justify-center`}
            style={{ display: "none" }}
          >
            <span className={`${fallbackInfo.textColor} font-bold text-sm`}>{fallbackInfo.text}</span>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 capitalize">{job.title}</h3>

          <p className="text-gray-500 text-sm mb-3">
            {job.company} • {job.location}
          </p>

          <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">{job.description}</p>

          <div className="flex flex-wrap gap-2">
            {job.categories?.map((category, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(category)}`}
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
