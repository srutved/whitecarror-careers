"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { EditorSidebar } from "@/components/editor/editor-sidebar"
import { CareersHeader } from "@/components/careers/careers-header"
import { SectionRenderer } from "@/components/careers/section-renderer"
import { JobList } from "@/components/careers/job-list"
import { dummyCompanyData } from "@/lib/dummy-data"
import type { Company, PageSection } from "@/lib/types"
import { Button } from "@/components/ui/button"

export default function EditorPage() {
  const router = useRouter()
  const params = useParams()

  const [user, setUser] = useState<any>(null);
  const [company, setCompany] = useState<Company | null>(null)
  const [companyDraft, setCompanyDraft] = useState<Company>({} as Company)

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) {
          setUser(data.user);
          setCompany(data.company);
          setCompanyDraft(data.company);
        }
      });
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/login")
  }

  const handleViewPublic = () => {
    router.push(`/${company?.slug}/careers`)
  }

  return (
    <div className="flex min-h-screen">
      <EditorSidebar
        companyDraft={companyDraft}
        setCompanyDraft={setCompanyDraft}
        onViewPublic={handleViewPublic}
      />

      <main id="main-content" className="flex-1 h-screen bg-muted/30 overflow-y-auto">
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold text-lg text-foreground">Live Preview</h2>
            <div className="space-x-2">
              {company?.slug && <Button variant="outline" className="bg-transparent" onClick={handleViewPublic}>
                View Public Page
              </Button>}
              <Button variant="outline" className="bg-transparent" onClick={handleLogout}>
                Log Out
              </Button>
            </div>
          </div>
        </div>
        {
          companyDraft ? <div className="pb-16">
            <CareersHeader company={companyDraft} />
            {/* <SectionRenderer /> */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <JobList jobs={dummyCompanyData.jobs} />
            </div>
          </div> : <div className="text-center py-32 px-2">
            <h1 className="text-2xl font-bold">Enter Company Details to View Live Preview.</h1>
          </div >
        }

      </main >
    </div >
  )
}
