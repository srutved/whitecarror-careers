"use client"

import { Company } from "@/lib/types";
import { Building2 } from "lucide-react";

interface CareersHeaderProps {
  company: Company
}

export function CareersHeader({ company }: CareersHeaderProps) {
  return (
    <header className="relative">
      {/* Banner & Header */}
      <div
        className="h-48 md:h-64 lg:h-80 w-full bg-linear-to-r from-primary/20 to-accent/20"
        style={{
          backgroundImage: company?.banner_url ? `url(${company?.banner_url})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-4">
              <div
                className="w-12 h-12 sm:w-24 sm:h-24 rounded-xl border-4 border-background bg-card flex items-center justify-center shadow-lg"
                style={{
                  backgroundImage: company?.logo_url ? `url(${company?.logo_url})` : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {!company?.logo_url && <Building2 className="h-10 w-10 text-muted-foreground" />}
              </div>
              <div>
                <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold" style={{ color: company?.text_color || "black" }}>
                  {company?.name || "Company Name"}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
