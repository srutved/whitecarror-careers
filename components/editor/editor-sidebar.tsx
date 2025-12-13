"use client"

import { useState } from "react"
import { ChevronDown, X, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ColorPicker } from "@/components/ui/color-picker"
import { ImageUpload } from "@/components/ui/image-upload"
import { SectionItem } from "./section-item"
import { AddSectionDropdown } from "./add-section-dropdown"
import { SectionEditorDialog } from "./section-editor-dialog"
import type { Company, PageSection } from "@/lib/types"
import { Textarea } from "../ui/textarea"

interface EditorSidebarProps {
  companyDraft: Company | null
  onViewPublic: () => void
  setCompanyDraft: (company: Company) => void
}

export function EditorSidebar({
  companyDraft, onViewPublic, setCompanyDraft
}: EditorSidebarProps) {
  const [isCompanyDetailsOpen, setIsCompanyDetailsOpen] = useState(true)
  const [isThemeOpen, setIsThemeOpen] = useState(true)
  const [isSectionsOpen, setIsSectionsOpen] = useState(true)
  const [editingSection, setEditingSection] = useState<PageSection | null>(null)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const handleAddSection = (type: PageSection["type"]) => {
    const newSection: PageSection = {
      id: Date.now().toString(),
      type,
      title:
        type === "about"
          ? "About Us"
          : type === "mission"
            ? "Mission & Vision"
            : type === "life"
              ? "Life at Company"
              : type === "values"
                ? "Our Values"
                : "Custom Section",
      content: "",
      order: (companyDraft?.sections?.length || 0) + 1,
      visible: true,
    }
    // onSectionsChange([...sections, newSection])
  }

  const handleDeleteSection = (id: string) => {
    // onSectionsChange(sections.filter((s) => s.id !== id))
  }

  const handleToggleVisibility = (id: string) => {
    // onSectionsChange(sections.map((s) => (s.id === id ? { ...s, visible: !s.visible } : s)))
  }

  const handleSaveSection = (updatedSection: PageSection) => {
    // onSectionsChange(sections.map((s) => (s.id === updatedSection.id ? updatedSection : s)))
  }

  const handleCompanyDraftChange = (field: keyof Company, value: any) => {
    setCompanyDraft({ ...companyDraft!, [field]: value })
  }

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="font-semibold text-lg text-foreground">Page Editor</h2>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsMobileOpen(false)}
          aria-label="Close sidebar"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto py-4 space-y-4">
        {/* Company Details */}
        <Collapsible open={isCompanyDetailsOpen} onOpenChange={setIsCompanyDetailsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto hover:bg-transparent">
              <span className="font-bold text-sm text-foreground">Company Details</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${isThemeOpen ? "rotate-180" : ""}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 px-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="company-name" className="text-sm font-medium text-foreground">
                Company Name
              </Label>
              <Input
                id="company-name"
                value={companyDraft?.name || ""}
                onChange={(e) => handleCompanyDraftChange("name", e.target.value)}
                placeholder="Your company name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-slug" className="text-sm font-medium text-foreground">
                Company Slug
              </Label>
              <Input
                id="company-slug"
                value={companyDraft?.slug || ""}
                onChange={(e) => handleCompanyDraftChange("slug", e.target.value)}
                placeholder="your-company"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-description" className="text-sm font-medium text-foreground">
                Description
              </Label>
              <Textarea
                rows={4}
                id="company-description"
                value={companyDraft?.description || ""}
                onChange={(e) => handleCompanyDraftChange("description", e.target.value)}
                placeholder="A brief description of your company"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-website" className="text-sm font-medium text-foreground">
                Website URL
              </Label>
              <Input
                id="company-website"
                value={companyDraft?.website || ""}
                onChange={(e) => handleCompanyDraftChange("website", e.target.value)}
                placeholder="https://www.yourcompany.com"
              />
            </div>
            <ImageUpload
              label="Company Logo (1:1)"
              value={companyDraft?.logo_url || ""}
              onChange={(logo) => handleCompanyDraftChange("logo_url", logo)}
              aspectRatio="logo"
            />
            <ImageUpload
              label="Banner Image (16:9)"
              value={companyDraft?.banner_url || ""}
              onChange={(banner) => handleCompanyDraftChange("banner_url", banner)}
              aspectRatio="banner"
            />
            <Button className="w-full">Save Company Details</Button>
          </CollapsibleContent>
        </Collapsible>

        <div className="border-t border-border" />

        {/* Theme Section */}
        <Collapsible open={isThemeOpen} onOpenChange={setIsThemeOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto hover:bg-transparent">
              <span className="font-bold text-sm text-foreground">Company Theme</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${isThemeOpen ? "rotate-180" : ""}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 px-4 pt-4">
            <ColorPicker
              label="Primary Color"
              value={companyDraft?.primary_color || ""}
              onChange={(primaryColor) => handleCompanyDraftChange("primary_color", primaryColor)}
            />
            <ColorPicker
              label="Secondary Color"
              value={companyDraft?.secondary_color || ""}
              onChange={(secondaryColor) => handleCompanyDraftChange("secondary_color", secondaryColor)}
            />
            <ColorPicker
              label="Text Color"
              value={companyDraft?.text_color || ""}
              onChange={(textColor) => handleCompanyDraftChange("text_color", textColor)}
            />
            <div className="space-y-2">
              <Label htmlFor="video-url" className="text-sm font-medium text-foreground">
                Culture Video URL
              </Label>
              <Input
                id="video-url"
                value={companyDraft?.culture_video_url || ""}
                onChange={(e) => handleCompanyDraftChange("culture_video_url", e.target.value)}
                placeholder="https://youtube.com/embed/..."
              />
            </div>
            <Button className="w-full">Save Theme</Button>
          </CollapsibleContent>
        </Collapsible>

        <div className="border-t border-border" />

        {/* Sections */}
        <Collapsible open={isSectionsOpen} onOpenChange={setIsSectionsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto hover:bg-transparent">
              <span className="font-bold text-sm text-foreground">Page Sections</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${isSectionsOpen ? "rotate-180" : ""}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 pt-4 px-4">
            {(companyDraft?.sections || [])
              .sort((a, b) => a.order - b.order)
              .map((section) => (
                <SectionItem
                  key={section.id}
                  section={section}
                  onEdit={() => setEditingSection(section)}
                  onDelete={() => handleDeleteSection(section.id)}
                  onToggleVisibility={() => handleToggleVisibility(section.id)}
                />
              ))}
            <AddSectionDropdown onAdd={handleAddSection} />
          </CollapsibleContent>
        </Collapsible>

        <div className="border-t border-border" />
      </div>

      {/* <SectionEditorDialog
        section={editingSection}
        isOpen={!!editingSection}
        onClose={() => setEditingSection(null)}
        onSave={handleSaveSection}
      /> */}
    </div>
  )

  return (
    <>
      {/* Mobile toggle */}
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4 z-50 lg:hidden shadow-lg bg-transparent"
        onClick={() => setIsMobileOpen(true)}
        aria-label="Open editor sidebar"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Mobile drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsMobileOpen(false)} />
      )}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-80 bg-background border-r border-border transform transition-transform lg:hidden ${isMobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {sidebarContent}
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:block w-80 h-screen border-r border-border bg-background shrink-0">
        {sidebarContent}
      </div>
    </>
  )
}
