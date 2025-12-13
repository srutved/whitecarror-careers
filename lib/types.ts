export interface Company {
  id: string;

  // basic company info
  name: string | null;
  slug: string | null;
  description: string | null;
  website: string | null;

  // theme configuration
  primary_color: string | null;
  secondary_color: string | null;
  text_color: string | null;
  logo_url: string | null;
  banner_url: string | null;
  culture_video_url: string | null;

  // page builder
  sections: PageSection[];

  // status
  is_published: boolean;

  // timestamps
  created_at: string;
  updated_at: string;
}


export interface PageSection {
  id: string
  type: "about" | "mission" | "life" | "values" | "custom"
  title: string
  content: string
  images?: string[]
  order: number
  visible: boolean
}

export interface Job {
  id: string
  title: string
  location: string
  type: "full-time" | "part-time" | "remote" | "contract"
  department: string
  description: string
  requirements: string[]
  postedDate: string
}
