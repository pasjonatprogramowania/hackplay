import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Calendar, 
  FileText, 
  Sparkles, 
  Search, 
  Filter,
  ExternalLink,
  ChevronRight,
  Clock,
  Inbox,
  TrendingUp,
  AlertCircle,
  User,
  FilterX,
  Settings,
  ChevronDown,
  Scale,
  Users,
  Cpu,
  BarChart3,
  Tag,
  Check,
  Activity,
  Pill,
  TestTube,
  Stethoscope
} from "lucide-react";
import { useState, useEffect } from "react";

interface Category {
  id: string;
  label: string;
  color: string;
  icon: string;
}

interface ReportHighlight {
  id: string;
  text: string;
  category: string;
  notebookUrl: string;
  priority?: "high" | "medium" | "low";
}

interface Report {
  id: string;
  title: string;
  date: string;
  time: string;
  preview: string;
  highlights: ReportHighlight[];
  isRead: boolean;
  priority?: "high" | "medium" | "low";
}

interface UserProfile {
  firstName: string;
  lastName: string;
  position: string;
  department: "legal" | "marketing" | "sales" | "general" | "medical";
}

const categoryStyles: Record<string, { selected: string, unselected: string }> = {
  blue: {
    selected: "bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/50",
    unselected: "bg-blue-500/10 text-blue-500 border-blue-500/20 hover:bg-blue-500/20"
  },
  purple: {
    selected: "bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-500/50",
    unselected: "bg-purple-500/10 text-purple-500 border-purple-500/20 hover:bg-purple-500/20"
  },
  green: {
    selected: "bg-green-600 text-white border-green-500 shadow-lg shadow-green-500/50",
    unselected: "bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20"
  },
  orange: {
    selected: "bg-orange-600 text-white border-orange-500 shadow-lg shadow-orange-500/50",
    unselected: "bg-orange-500/10 text-orange-500 border-orange-500/20 hover:bg-orange-500/20"
  },
  red: {
    selected: "bg-red-600 text-white border-red-500 shadow-lg shadow-red-500/50",
    unselected: "bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20"
  }
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [reportDetailCategories, setReportDetailCategories] = useState<string[]>([]);
  const [subcategories, setSubcategories] = useState<Array<{id: string, name: string, parentCategory: string, description?: string, color: string}>>([]);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryParent, setNewCategoryParent] = useState("regulation");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [newCategoryColor, setNewCategoryColor] = useState("#3b82f6");
  const [isRetagDialogOpen, setIsRetagDialogOpen] = useState(false);
  const [retagHighlightId, setRetagHighlightId] = useState<string | null>(null);
  const [reports, setReports] = useState<Report[]>([]);

  const iconMap: Record<string, any> = {
    Scale,
    Users,
    Cpu,
    BarChart3,
    Activity,
    Pill,
    TestTube,
    Stethoscope
  };
  
  // Profile definitions
  // Profile definitions
  const profiles: Record<"lawyer" | "doctor", { user: UserProfile, reports: Report[], categories: Category[] }> = {
    lawyer: {
      user: {
        firstName: "Jan",
        lastName: "Kowalski",
        position: "Radca Prawny",
        department: "legal"
      },
      categories: [
        { id: "regulation", label: "Regulacje Prawne", color: "blue", icon: "Scale" },
        { id: "competition", label: "Zmiany na rynku", color: "purple", icon: "Users" },
        { id: "technology", label: "Nowa Technologia", color: "green", icon: "Cpu" },
        { id: "market", label: "Rynek", color: "orange", icon: "BarChart3" }
      ],
      reports: [
        {
          id: "1",
          title: "Popołudniowy Raport Dnia 24.10",
          date: "2025-10-24",
          time: "14:08",
          preview: "UC71 – zmiany w projekcie ustawy o systemach AI...",
          isRead: false,
          priority: "high",
          highlights: [
            {
              id: "h1",
              text: "Nowe przepisy wprowadzają obowiązkową cyfryzację komunikacji z sądami cywilnymi poprzez Portal Informacyjny. Od marca 2027 roku wnoszenie pism drogą elektroniczną będzie obligatoryjne dla wszystkich profesjonalnych pełnomocników.",
              category: "regulation",
              notebookUrl: "http://10.19.200.222:8080",
              priority: "high"
            },
            {
              id: "h2",
              text: "Orange Polska uruchomiło agresywną kampanię cenową - obniżka o 30% w segmencie korporacyjnym, bezpośrednie zagrożenie dla naszej bazy B2B",
              category: "competition",
              notebookUrl: "http://10.19.200.222:8080",
              priority: "high"
            },
            {
              id: "h3",
              text: "Nowelizacja prawa telekomunikacyjnego wchodzi w życie od przyszłego miesiąca - konieczność dostosowania regulaminów.",
              category: "regulation",
              notebookUrl: "http://10.19.200.222:8080",
              priority: "medium"
            },
            {
              id: "h4",
              text: "UOKiK wszczął postępowanie wyjaśniające w sprawie praktyk rynkowych konkurencji.",
              category: "competition",
              notebookUrl: "http://10.19.200.222:8080",
              priority: "low"
            }
          ]
        },
        {
          id: "2",
          title: "Poranny Raport Dnia 24.10",
          date: "2025-10-24",
          time: "08:15",
          preview: "Analiza rynku i monitoring działań konkurencji...",
          isRead: false,
          priority: "medium",
          highlights: [
            {
              id: "h6",
              text: "T-Mobile zaprezentowało nową ofertę dla małych firm - pakiet voice + data + Microsoft 365 za 89 zł/msc.",
              category: "competition",
              notebookUrl: "http://10.19.200.222:8080",
              priority: "medium"
            },
            {
              id: "h8",
              text: "UKE planuje konsultacje publiczne dotyczące nowych przepisów o numeracji telefonicznej.",
              category: "regulation",
              notebookUrl: "http://10.19.200.222:8080",
              priority: "low"
            },
            {
              id: "h9",
              text: "Zmiany w prawie pracy dotyczące pracy zdalnej - wpływ na wewnętrzne regulacje firmy.",
              category: "regulation",
              notebookUrl: "http://10.19.200.222:8080",
              priority: "high"
            }
          ]
        }
      ]
    },
    doctor: {
      user: {
        firstName: "Anna",
        lastName: "Nowak",
        position: "Lekarz Specjalista",
        department: "medical"
      },
      categories: [
        { id: "medical_regulation", label: "Regulacje Medyczne", color: "blue", icon: "Scale" },
        { id: "epidemiology", label: "Epidemiologia", color: "red", icon: "Activity" },
        { id: "pharmacy", label: "Farmakologia", color: "green", icon: "Pill" },
        { id: "research", label: "Badania", color: "purple", icon: "TestTube" }
      ],
      reports: [
        {
          id: "d1",
          title: "Raport Medyczny - Poranny Obchód",
          date: "2025-10-24",
          time: "07:30",
          preview: "Stan pacjentów stabilny, nowe wytyczne dot. antybiotykoterapii...",
          isRead: false,
          priority: "high",
          highlights: [
            {
              id: "dh1",
              text: "Nowe wytyczne Ministerstwa Zdrowia dotyczące stosowania antybiotyków w infekcjach górnych dróg oddechowych.",
              category: "medical_regulation",
              notebookUrl: "#",
              priority: "high"
            },
            {
              id: "dh2",
              text: "Wzrost liczby przypadków grypy w regionie - zalecane zwiększenie środków ostrożności.",
              category: "epidemiology",
              notebookUrl: "#",
              priority: "high"
            },
            {
              id: "dh3",
              text: "Dostępność nowego leku na nadciśnienie w aptece szpitalnej.",
              category: "pharmacy",
              notebookUrl: "#",
              priority: "medium"
            }
          ]
        },
        {
          id: "d2",
          title: "Przegląd Prasy Medycznej",
          date: "2025-10-23",
          time: "18:00",
          preview: "Nowoczesne metody leczenia cukrzycy typu 2...",
          isRead: true,
          priority: "medium",
          highlights: [
            {
              id: "dh4",
              text: "Publikacja w Lancet o skuteczności nowych agonistów GLP-1.",
              category: "pharmacy",
              notebookUrl: "#",
              priority: "high"
            },
            {
              id: "dh5",
              text: "Konferencja kardiologiczna w Warszawie - podsumowanie najważniejszych wystąpień.",
              category: "research",
              notebookUrl: "#",
              priority: "low"
            }
          ]
        }
      ]
    }
  };

  const [currentProfile, setCurrentProfile] = useState<"lawyer" | "doctor">("lawyer");


  // Initialize reports state when profile changes
  useEffect(() => {
    setReports(profiles[currentProfile].reports);
    setSelectedCategories([]); // Reset filters
    setReportDetailCategories([]);
    setSelectedReport(null); // Reset selection
  }, [currentProfile]);

  // State for selected report - declare before using it
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  // Filter reports based on selected categories (sidebar)
  // This creates a filtered list for the sidebar, but preserves full report data
  const filteredReports = reports.filter(report => {
    // If no categories selected, show all reports
    if (selectedCategories.length === 0) return true;
    // Otherwise, only show reports that have at least one highlight matching selected categories
    return report.highlights.some(h => selectedCategories.includes(h.category));
  });

  // Auto-select latest report on mount
  useEffect(() => {
    if (reports.length > 0 && !selectedReport) {
      // Select the first report (latest) from the filtered list, or first unread if available
      const firstUnreadReport = filteredReports.find(r => !r.isRead);
      setSelectedReport(firstUnreadReport || filteredReports[0]);
    }
  }, [reports, filteredReports, selectedReport]);

  const getCategoryColor = (category: string) => {
    const profileCategory = profiles[currentProfile].categories.find(c => c.id === category);
    if (profileCategory) {
      const color = profileCategory.color;
      return categoryStyles[color]?.unselected || "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }

    // Check if it's a subcategory
    const subcat = subcategories.find(c => c.id === category);
    if (subcat) {
      // Return a class that will be overridden by inline style
      return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
    return "bg-gray-500/20 text-gray-400 border-gray-500/30";
  };

  const getCategoryLabel = (category: string) => {
    const profileCategory = profiles[currentProfile].categories.find(c => c.id === category);
    if (profileCategory) {
      return profileCategory.label;
    }
    // Check if it's a subcategory
    const subcat = subcategories.find(c => c.id === category);
    return subcat ? subcat.name : category;
  };

  const getCategoryIcon = (category: string) => {
    const profileCategory = profiles[currentProfile].categories.find(c => c.id === category);
    if (profileCategory) {
      const Icon = iconMap[profileCategory.icon];
      return Icon ? <Icon className="w-3 h-3" /> : null;
    }
    return <Sparkles className="w-3 h-3" />;
  };

  // Get relevant categories based on user department
  const getRelevantCategories = (department: string): string[] => {
    switch (department) {
      case "legal": return ["regulation"];
      case "marketing": return ["competition", "market"];
      case "sales": return ["competition", "market", "technology"];
      default: return ["regulation", "competition", "technology", "market"];
    }
  };

  // Auto-select first unread report on mount

  // Sync report detail categories with sidebar selection when report changes
  useEffect(() => {
    if (selectedReport) {
      // Pre-select categories in report detail that match the sidebar selection
      // This is the default state, user can then change it independently
      const reportCategories = selectedReport.highlights.map(h => h.category as string);
      const matchingCategories = selectedCategories.filter(cat => reportCategories.includes(cat));
      setReportDetailCategories(matchingCategories);
    } else {
      setReportDetailCategories([]);
    }
  }, [selectedReport, selectedCategories]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Toggle report detail category filter
  const toggleReportDetailCategory = (category: string) => {
    setReportDetailCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Get filtered highlights for the selected report detail view
  const getFilteredHighlights = (highlights: ReportHighlight[]) => {
    if (reportDetailCategories.length === 0) return highlights;
    return highlights.filter(h => reportDetailCategories.includes(h.category));
  };

  // Add subcategory
  const handleAddSubcategory = () => {
    if (newCategoryName.trim()) {
      const newSubcategory = {
        id: `sub-${Date.now()}`,
        name: newCategoryName.trim(),
        parentCategory: newCategoryParent,
        description: newCategoryDescription.trim() || undefined,
        color: newCategoryColor
      };
      setSubcategories(prev => [...prev, newSubcategory]);
      setNewCategoryName("");
      setNewCategoryParent("regulation");
      setNewCategoryDescription("");
      setNewCategoryColor("#3b82f6");
      setIsAddCategoryOpen(false);
    }
  };

  // Remove subcategory
  const handleRemoveSubcategory = (id: string) => {
    setSubcategories(prev => prev.filter(c => c.id !== id));
    setSelectedCategories(prev => prev.filter(c => c !== id));
    setReportDetailCategories(prev => prev.filter(c => c !== id));
  };

  // Assign category to a highlight
  const handleAssignCategory = (highlightId: string, newCategoryId: string) => {
    if (!selectedReport) return;

    // Update the reports state
    const updatedReports = reports.map(report => {
      if (report.id === selectedReport.id) {
        return {
          ...report,
          highlights: report.highlights.map(h => 
            h.id === highlightId ? { ...h, category: newCategoryId as any } : h
          )
        };
      }
      return report;
    });

    setReports(updatedReports);

    // Update the selected report
    const updatedSelectedReport = updatedReports.find(r => r.id === selectedReport.id);
    if (updatedSelectedReport) {
      setSelectedReport(updatedSelectedReport);
    }
    
    // Close the dialog
    setIsRetagDialogOpen(false);
    setRetagHighlightId(null);
  };

  // Open re-tag dialog
  const openRetagDialog = (highlightId: string) => {
    setRetagHighlightId(highlightId);
    setIsRetagDialogOpen(true);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Subtle Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-[oklch(0.97_0.005_285)] to-[oklch(0.96_0.01_290)]" />
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float-delayed" />
      </div>

      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50 glass">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Logo removed as requested */}
              <h1 className="text-2xl font-bold text-foreground">
                Daily Reporter
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="mr-4">
                 <select 
                    className="bg-background border border-input rounded px-2 py-1 text-sm"
                    value={currentProfile}
                    onChange={(e) => setCurrentProfile(e.target.value as "lawyer" | "doctor")}
                 >
                    <option value="lawyer">Prawnik</option>
                    <option value="doctor">Lekarz</option>
                 </select>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">
                  {profiles[currentProfile].user.firstName} {profiles[currentProfile].user.lastName}
                </p>
                <p className="text-xs text-muted-foreground">{profiles[currentProfile].user.position}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-purple flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <Button size="sm" variant="ghost" className="h-10 w-10 p-0">
                <Settings className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar - Report List */}
          <div className="col-span-12 lg:col-span-4">
            <Card className="glass-strong border-primary/20 h-[calc(100vh-180px)] flex flex-col">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-primary" />
                  Raporty
                </CardTitle>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-muted-foreground">Filtruj po kategoriach:</p>
                    {selectedCategories.length > 0 && (
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-6 px-2 text-xs"
                        onClick={() => setSelectedCategories([])}
                      >
                        Wszystkie Kategorie
                      </Button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profiles[currentProfile].categories.map(category => {
                      const Icon = iconMap[category.icon];
                      const styles = categoryStyles[category.color];
                      return (
                        <Badge 
                          key={category.id}
                          onClick={() => toggleCategory(category.id)}
                          className={`cursor-pointer transition-all ${selectedCategories.includes(category.id) ? styles.selected : styles.unselected}`}
                        >
                          {Icon && <Icon className="w-3 h-3 mr-1" />}
                          {category.label}
                        </Badge>
                      );
                    })}
                    {subcategories.map(cat => (
                      <Badge 
                        key={cat.id}
                        onClick={() => toggleCategory(cat.id)}
                        className={`cursor-pointer transition-all group relative ${selectedCategories.includes(cat.id) ? "text-white border shadow-lg" : "border hover:opacity-80"}`}
                        style={{
                          backgroundColor: selectedCategories.includes(cat.id) ? cat.color : `${cat.color}20`,
                          borderColor: cat.color,
                          color: selectedCategories.includes(cat.id) ? 'white' : cat.color,
                          boxShadow: selectedCategories.includes(cat.id) ? `0 10px 15px -3px ${cat.color}50` : 'none'
                        }}
                      >
                        <Sparkles className="w-3 h-3 mr-1" />
                        {cat.name}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveSubcategory(cat.id);
                          }}
                          className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-2 border-dashed border-primary/30 hover:border-primary/50"
                      >
                        <Sparkles className="w-3 h-3 mr-2" />
                        Dodaj podkategorię
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Dodaj Podkategorię</DialogTitle>
                        <DialogDescription>
                          Stwórz bardziej szczegółową podkategorię w ramach istniejącej kategorii, aby lepiej organizować raporty.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 pt-4">
                        <div>
                          <Label htmlFor="parent-category">Kategoria Nadrzędna</Label>
                          <select
                            id="parent-category"
                            value={newCategoryParent}
                            onChange={(e) => setNewCategoryParent(e.target.value)}
                            className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                          >
                            {profiles[currentProfile].categories.map(category => (
                              <option key={category.id} value={category.id}>{category.label}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="subcategory-name">Nazwa Podkategorii</Label>
                          <Input
                            id="subcategory-name"
                            placeholder="np. Prawo Finansowe, Prawo Pracy"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddSubcategory()}
                          />
                        </div>
                        <div>
                          <Label htmlFor="subcategory-description">Opis (Opcjonalne)</Label>
                          <Input
                            id="subcategory-description"
                            placeholder="Krótki opis czego dotyczy ta podkategoria"
                            value={newCategoryDescription}
                            onChange={(e) => setNewCategoryDescription(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="subcategory-color">Kolor Podkategorii</Label>
                          <div className="flex gap-2 items-center">
                            <Input
                              id="subcategory-color"
                              type="color"
                              value={newCategoryColor}
                              onChange={(e) => setNewCategoryColor(e.target.value)}
                              className="w-20 h-10"
                            />
                            <span className="text-sm text-muted-foreground">{newCategoryColor}</span>
                          </div>
                        </div>
                        <Button onClick={handleAddSubcategory} className="w-full">
                          Dodaj Podkategorię
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Szukaj raportów..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 glass border-primary/30"
                  />
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto space-y-2 pt-0">
                {filteredReports.map((report) => (
                  <div
                    key={report.id}
                    onClick={() => setSelectedReport(report)}
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-300 border ${
                      selectedReport?.id === report.id
                        ? "glass-strong border-primary/60 scale-[1.02]"
                        : report.isRead
                        ? "glass border-border/30 hover:border-primary/40"
                        : "glass-strong border-primary/40 hover:border-primary/60"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs text-muted-foreground">{report.time}</span>
                    </div>
                    <h3 className={`text-sm font-medium mb-1 ${!report.isRead ? "text-foreground" : "text-muted-foreground"}`}>
                      {report.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-1">{report.preview}</p>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      {!report.isRead && (
                        <Badge variant="secondary" className="text-xs bg-primary/20 text-primary border-primary/30">
                          Nowy
                        </Badge>
                      )}
                      {report.highlights.slice(0, 3).map((h) => (
                        <Badge key={h.id} className={`${getCategoryColor(h.category)} text-xs flex items-center gap-1`}>
                          {getCategoryIcon(h.category)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Report Detail */}
          <div className="col-span-12 lg:col-span-8">
            {selectedReport ? (
              <Card className="glass-strong border-primary/20 h-[calc(100vh-180px)] flex flex-col">
                <CardHeader className="border-b border-border/50">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2">{selectedReport.title}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {selectedReport.date}, {selectedReport.time}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-muted-foreground">Filtruj podświetlenia:</p>
                      {reportDetailCategories.length > 0 && (
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-6 px-2 text-xs"
                          onClick={() => setReportDetailCategories([])}
                        >
                          Wszystkie Kategorie
                        </Button>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {/* Dynamically show only categories present in this report */}
                      {Array.from(new Set(selectedReport.highlights.map(h => h.category))).map(category => {
                        const profileCategory = profiles[currentProfile].categories.find(c => c.id === category);
                        const customCat = subcategories.find(c => c.id === category);
                        
                        if (profileCategory) {
                          const Icon = iconMap[profileCategory.icon];
                          const styles = categoryStyles[profileCategory.color];
                          return (
                            <Badge 
                              key={category}
                              onClick={() => toggleReportDetailCategory(category)}
                              className={`cursor-pointer transition-all ${reportDetailCategories.includes(category) ? styles.selected : styles.unselected}`}
                            >
                              {Icon && <Icon className="w-3 h-3 mr-1" />}
                              {profileCategory.label}
                            </Badge>
                          );
                        } else if (customCat) {
                          return (
                            <Badge 
                              key={category}
                              onClick={() => toggleReportDetailCategory(category)}
                              className={`cursor-pointer transition-all ${reportDetailCategories.includes(category) ? "shadow-lg" : "opacity-50 hover:opacity-100"}`}
                              style={reportDetailCategories.includes(category) ? {
                                backgroundColor: customCat.color,
                                color: "white",
                                borderColor: customCat.color,
                                boxShadow: `0 10px 15px -3px ${customCat.color}50`
                              } : {
                                backgroundColor: `${customCat.color}10`,
                                color: `${customCat.color}80`,
                                borderColor: `${customCat.color}20`
                              }}
                            >
                              <Sparkles className="w-3 h-3 mr-1" />
                              {customCat.name}
                            </Badge>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto pt-6">
                  {selectedReport.highlights.length === 0 ? (
                    <div className="p-4 rounded-lg glass border border-border/30 text-center">
                      <p className="text-sm text-muted-foreground">
                        Brak dostępnych podkreśleń w tym raporcie. Zaznacz tekst w raporcie, aby dodać podkreślenia i kategorie.
                      </p>
                    </div>
                  ) : (
                    <div className="prose prose-invert max-w-none">
                      <p className="text-foreground mb-4">Cześć,</p>
                      <p className="text-foreground mb-6">
                        Oto Twój dzienny raport. Zebraliśmy najnowsze informacje i spostrzeżenia.
                      </p>

                      {/* High Priority Section */}
                      {selectedReport.highlights.filter(h => h.priority === "high" && (reportDetailCategories.length === 0 || reportDetailCategories.includes(h.category))).length > 0 && (
                        <>
                          <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-red-500" />
                            Najważniejsze wydarzenia dnia:
                          </h3>
                          <div className="space-y-4 mb-8">
                            {selectedReport.highlights
                              .filter(highlight =>
                                highlight.priority === "high" &&
                                (reportDetailCategories.length === 0 || reportDetailCategories.includes(highlight.category))
                              )
                              .map((highlight) => (
                                <div key={highlight.id} className="p-4 rounded-lg glass border border-red-500/30 bg-red-500/5">
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                      <Badge
                                        className={`${getCategoryColor(highlight.category)} text-xs`}
                                        style={subcategories.find(c => c.id === highlight.category) ? {
                                          backgroundColor: `${subcategories.find(c => c.id === highlight.category)?.color}20`,
                                          color: subcategories.find(c => c.id === highlight.category)?.color,
                                          borderColor: `${subcategories.find(c => c.id === highlight.category)?.color}30`
                                        } : undefined}
                                      >
                                        {getCategoryLabel(highlight.category)}
                                      </Badge>
                                      <Badge className="text-xs bg-red-500/20 text-red-400 border-red-500/40">
                                        Wysoki priorytet
                                      </Badge>
                                    </div>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-6 px-2 text-muted-foreground hover:text-primary"
                                      onClick={() => openRetagDialog(highlight.id)}
                                    >
                                      <Tag className="w-3 h-3 mr-1" />
                                      <span className="text-xs">Zmień kategorię</span>
                                    </Button>
                                  </div>
                                  <p className="text-foreground mb-3 leading-relaxed">
                                    {highlight.text}
                                  </p>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-primary hover:text-primary hover:bg-primary/10 group-hover:translate-x-1 transition-transform"
                                    onClick={() => window.open("http://10.250.193.60:8081/", "_blank")}
                                  >
                                    <Sparkles className="w-4 h-4 mr-2" />
                                    Poproś o wyjaśnienie
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                  </Button>
                                </div>
                              ))}
                          </div>
                        </>
                      )}

                      {/* Medium Priority Section */}
                      {selectedReport.highlights.filter(h => h.priority === "medium" && (reportDetailCategories.length === 0 || reportDetailCategories.includes(h.category))).length > 0 && (
                        <>
                          <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-yellow-500" />
                            Normalny priorytet:
                          </h3>
                          <div className="space-y-4 mb-8">
                            {selectedReport.highlights
                              .filter(highlight =>
                                highlight.priority === "medium" &&
                                (reportDetailCategories.length === 0 || reportDetailCategories.includes(highlight.category))
                              )
                              .map((highlight) => (
                                <div key={highlight.id} className="p-4 rounded-lg glass border border-yellow-500/20 bg-yellow-500/5">
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                      <Badge
                                        className={`${getCategoryColor(highlight.category)} text-xs`}
                                        style={subcategories.find(c => c.id === highlight.category) ? {
                                          backgroundColor: `${subcategories.find(c => c.id === highlight.category)?.color}20`,
                                          color: subcategories.find(c => c.id === highlight.category)?.color,
                                          borderColor: `${subcategories.find(c => c.id === highlight.category)?.color}30`
                                        } : undefined}
                                      >
                                        {getCategoryLabel(highlight.category)}
                                      </Badge>
                                      <Badge className="text-xs bg-yellow-500/20 text-yellow-400 border-yellow-500/40">
                                        Normalny priorytet
                                      </Badge>
                                    </div>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-6 px-2 text-muted-foreground hover:text-primary"
                                      onClick={() => openRetagDialog(highlight.id)}
                                    >
                                      <Tag className="w-3 h-3 mr-1" />
                                      <span className="text-xs">Zmień kategorię</span>
                                    </Button>
                                  </div>
                                  <p className="text-foreground mb-3 leading-relaxed">
                                    {highlight.text}
                                  </p>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-primary hover:text-primary hover:bg-primary/10 group-hover:translate-x-1 transition-transform"
                                    onClick={() => window.open("http://10.250.193.60:8081/", "_blank")}
                                  >
                                    <Sparkles className="w-4 h-4 mr-2" />
                                    Poproś o wyjaśnienie
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                  </Button>
                                </div>
                              ))}
                          </div>
                        </>
                      )}

                      {/* Low Priority Section */}
                      {selectedReport.highlights.filter(h => h.priority === "low" && (reportDetailCategories.length === 0 || reportDetailCategories.includes(h.category))).length > 0 && (
                        <>
                          <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-gray-500" />
                            Niski priorytet:
                          </h3>
                          <div className="space-y-4">
                            {selectedReport.highlights
                              .filter(highlight =>
                                highlight.priority === "low" &&
                                (reportDetailCategories.length === 0 || reportDetailCategories.includes(highlight.category))
                              )
                              .map((highlight) => (
                                <div key={highlight.id} className="p-4 rounded-lg glass border border-border/30">
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                      <Badge
                                        className={`${getCategoryColor(highlight.category)} text-xs`}
                                        style={subcategories.find(c => c.id === highlight.category) ? {
                                          backgroundColor: `${subcategories.find(c => c.id === highlight.category)?.color}20`,
                                          color: subcategories.find(c => c.id === highlight.category)?.color,
                                          borderColor: `${subcategories.find(c => c.id === highlight.category)?.color}30`
                                        } : undefined}
                                      >
                                        {getCategoryLabel(highlight.category)}
                                      </Badge>
                                      <Badge className="text-xs bg-gray-500/20 text-gray-400 border-gray-500/40">
                                        Niski priorytet
                                      </Badge>
                                    </div>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-6 px-2 text-muted-foreground hover:text-primary"
                                      onClick={() => openRetagDialog(highlight.id)}
                                    >
                                      <Tag className="w-3 h-3 mr-1" />
                                      <span className="text-xs">Zmień kategorię</span>
                                    </Button>
                                  </div>
                                  <p className="text-foreground mb-3 leading-relaxed">
                                    {highlight.text}
                                  </p>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-primary hover:text-primary hover:bg-primary/10 group-hover:translate-x-1 transition-transform"
                                    onClick={() => window.open("http://10.250.193.60:8081/", "_blank")}
                                  >
                                    <Sparkles className="w-4 h-4 mr-2" />
                                    Poproś o wyjaśnienie
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                  </Button>
                                </div>
                              ))}
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="glass-strong border-primary/20 h-[calc(100vh-180px)] flex items-center justify-center">
                <CardContent className="text-center">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-purple-vibrant flex items-center justify-center animate-glow">
                    <Inbox className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Wybierz Raport</h3>
                  <p className="text-muted-foreground">
                    Wybierz raport ze skrzynki odbiorczej, aby zobaczyć jego treść i podświetlenia
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      {/* Re-tag Dialog */}
      <Dialog open={isRetagDialogOpen} onOpenChange={setIsRetagDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Przypisz Kategorię</DialogTitle>
            <DialogDescription>
              Wybierz kategorię, którą chcesz przypisać do tego podświetlenia.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-2 py-4">
            {/* Default Categories */}
            <Button
              variant="outline"
              className="justify-start h-auto py-3 px-4"
              onClick={() => retagHighlightId && handleAssignCategory(retagHighlightId, "regulation")}
            >
              <div className="flex items-center gap-3 w-full">
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                <Scale className="w-4 h-4" />
                <span className="flex-1 text-left">Regulacje Prawne</span>
                {selectedReport?.highlights.find(h => h.id === retagHighlightId)?.category === "regulation" && (
                  <Check className="w-4 h-4 text-primary" />
                )}
              </div>
            </Button>
            <Button
              variant="outline"
              className="justify-start h-auto py-3 px-4"
              onClick={() => retagHighlightId && handleAssignCategory(retagHighlightId, "competition")}
            >
              <div className="flex items-center gap-3 w-full">
                <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                <Users className="w-4 h-4" />
                <span className="flex-1 text-left">Konkurencja</span>
                {selectedReport?.highlights.find(h => h.id === retagHighlightId)?.category === "competition" && (
                  <Check className="w-4 h-4 text-primary" />
                )}
              </div>
            </Button>
            <Button
              variant="outline"
              className="justify-start h-auto py-3 px-4"
              onClick={() => retagHighlightId && handleAssignCategory(retagHighlightId, "technology")}
            >
              <div className="flex items-center gap-3 w-full">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <Cpu className="w-4 h-4" />
                <span className="flex-1 text-left">Nowa Technologia</span>
                {selectedReport?.highlights.find(h => h.id === retagHighlightId)?.category === "technology" && (
                  <Check className="w-4 h-4 text-primary" />
                )}
              </div>
            </Button>
            <Button
              variant="outline"
              className="justify-start h-auto py-3 px-4"
              onClick={() => retagHighlightId && handleAssignCategory(retagHighlightId, "market")}
            >
              <div className="flex items-center gap-3 w-full">
                <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                <BarChart3 className="w-4 h-4" />
                <span className="flex-1 text-left">Rynek</span>
                {selectedReport?.highlights.find(h => h.id === retagHighlightId)?.category === "market" && (
                  <Check className="w-4 h-4 text-primary" />
                )}
              </div>
            </Button>
            
            {/* Subcategories */}
            {subcategories.length > 0 && (
              <>
                <div className="border-t my-2"></div>
                {subcategories.map(cat => (
                  <Button
                    key={cat.id}
                    variant="outline"
                    className="justify-start h-auto py-3 px-4"
                    onClick={() => retagHighlightId && handleAssignCategory(retagHighlightId, cat.id)}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: cat.color }}></div>
                      <Sparkles className="w-4 h-4" />
                      <span className="flex-1 text-left">{cat.name}</span>
                      {selectedReport?.highlights.find(h => h.id === retagHighlightId)?.category === cat.id && (
                        <Check className="w-4 h-4 text-primary" />
                      )}
                    </div>
                  </Button>
                ))}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
