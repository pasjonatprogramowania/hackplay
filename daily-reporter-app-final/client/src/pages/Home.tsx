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
  Check
} from "lucide-react";
import { useState, useEffect } from "react";

interface ReportHighlight {
  id: string;
  text: string;
  category: "regulation" | "competition" | "technology" | "market";
  notebookUrl: string;
}

interface Report {
  id: string;
  title: string;
  date: string;
  time: string;
  preview: string;
  highlights: ReportHighlight[];
  isRead: boolean;
  hasAttachment?: boolean;
}

interface UserProfile {
  firstName: string;
  lastName: string;
  position: string;
  department: "legal" | "marketing" | "sales" | "general";
}

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
  
  // User profile - in real app this would come from authentication
  const userProfile: UserProfile = {
    firstName: "Jan",
    lastName: "Kowalski",
    position: "Legal Counsel",
    department: "legal"
  };

  const initialReports: Report[] = [
    {
      id: "1",
      title: "Daily Afternoon 14.08 Report",
      date: "2025-10-24",
      time: "14:08",
      preview: "Hi there, here's your daily digest...",
      isRead: false,
      hasAttachment: true,
      highlights: [
        {
          id: "h1",
          text: "UKE ogłosiło zmiany w przepisach dotyczących wirtualnych operatorów sieci komórkowych (MVNO) - wchodzi w życie od 1 września",
          category: "regulation",
          notebookUrl: "https://notebooklm.google.com/notebook/your-notebook-1"
        },
        {
          id: "h2",
          text: "Prezes Plus, Michał Kowalski, ogłosił nową strategię cenową dla abonamentów biznesowych na konferencji prasowej",
          category: "competition",
          notebookUrl: "https://notebooklm.google.com/notebook/your-notebook-2"
        },
        {
          id: "h3",
          text: "Wdrożenie usługi VoWiFi (połączenia głosowe przez WiFi) zakończone sukcesem - dostępne dla wszystkich klientów od przyszłego tygodnia",
          category: "technology",
          notebookUrl: "https://notebooklm.google.com/notebook/your-notebook-3"
        }
      ]
    },
    {
      id: "2",
      title: "Daily Morning 14.08 Report",
      date: "2025-10-24",
      time: "08:15",
      preview: "Hi there, here's your daily digest...",
      isRead: true,
      hasAttachment: true,
      highlights: [
        {
          id: "h4",
          text: "Orange Polska ogłosiło partnerstwo z Google Cloud w zakresie AI i machine learning",
          category: "technology",
          notebookUrl: "https://notebooklm.google.com/notebook/your-notebook-4"
        },
        {
          id: "h5",
          text: "Nowe dane UKE: wzrost liczby użytkowników 5G o 23% w ostatnim kwartale",
          category: "market",
          notebookUrl: "https://notebooklm.google.com/notebook/your-notebook-5"
        }
      ]
    },
    {
      id: "3",
      title: "Daily Afternoon 13.08 Report",
      date: "2025-10-23",
      time: "14:08",
      preview: "Hi there, here's your daily digest...",
      isRead: true,
      hasAttachment: true,
      highlights: [
        {
          id: "h6",
          text: "T-Mobile uruchamia nową ofertę dla firm - nielimitowany internet 5G w cenie 99 zł/msc",
          category: "competition",
          notebookUrl: "https://notebooklm.google.com/notebook/your-notebook-6"
        }
      ]
    }
  ];

  // Initialize reports state on mount
  useEffect(() => {
    if (reports.length === 0) {
      setReports(initialReports);
    }
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "regulation": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "competition": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "technology": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "market": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      default: {
        // Check if it's a subcategory
        const subcat = subcategories.find(c => c.id === category);
        if (subcat) {
          // Return a class that will be overridden by inline style
          return "bg-gray-500/20 text-gray-400 border-gray-500/30";
        }
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      }
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "regulation": return "Regulacje Prawne";
      case "competition": return "Konkurencja";
      case "technology": return "Nowa Technologia";
      case "market": return "Rynek";
      default: {
        // Check if it's a subcategory
        const subcat = subcategories.find(c => c.id === category);
        return subcat ? subcat.name : category;
      }
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "regulation": return <Scale className="w-3 h-3" />;
      case "competition": return <Users className="w-3 h-3" />;
      case "technology": return <Cpu className="w-3 h-3" />;
      case "market": return <BarChart3 className="w-3 h-3" />;
      default: return null;
    }
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

  // Filter reports based on selected categories (sidebar)
  // This creates a filtered list for the sidebar, but preserves full report data
  const filteredReports = reports.filter(report => {
    // If no categories selected, show all reports
    if (selectedCategories.length === 0) return true;
    // Otherwise, only show reports that have at least one highlight matching selected categories
    return report.highlights.some(h => selectedCategories.includes(h.category));
  });

  // Auto-select first unread report on mount
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  
  useEffect(() => {
    const firstUnreadReport = filteredReports.find(r => !r.isRead);
    if (firstUnreadReport) {
      setSelectedReport(firstUnreadReport);
    }
  }, [selectedCategories]);

  // Sync report detail categories with sidebar selection when report changes
  useEffect(() => {
    if (selectedReport) {
      // Pre-select categories in report detail that match the sidebar selection
      // This is the default state, user can then change it independently
      const reportCategories = selectedReport.highlights.map(h => h.category);
      const matchingCategories = selectedCategories.filter(cat => reportCategories.includes(cat));
      setReportDetailCategories(matchingCategories);
    } else {
      setReportDetailCategories([]);
    }
  }, [selectedReport, selectedCategories]);

  // Toggle category selection
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
              <img src="/play-logo.png" alt="Play Logo" className="h-8" />
              <h1 className="text-2xl font-bold text-foreground">
                Daily Reporter
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">
                  {userProfile.firstName} {userProfile.lastName}
                </p>
                <p className="text-xs text-muted-foreground">{userProfile.position}</p>
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
                  Reports
                </CardTitle>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-muted-foreground">Filter by categories:</p>
                    {selectedCategories.length > 0 && (
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-6 px-2 text-xs"
                        onClick={() => setSelectedCategories([])}
                      >
                        All Categories
                      </Button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge 
                      onClick={() => toggleCategory("regulation")}
                      className={`cursor-pointer transition-all ${selectedCategories.includes("regulation") ? "bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/50" : "bg-blue-500/10 text-blue-400/50 border-blue-500/20 hover:bg-blue-500/20"}`}
                    >
                      <Scale className="w-3 h-3 mr-1" />
                      Regulacje Prawne
                    </Badge>
                    <Badge 
                      onClick={() => toggleCategory("competition")}
                      className={`cursor-pointer transition-all ${selectedCategories.includes("competition") ? "bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-500/50" : "bg-purple-500/10 text-purple-400/50 border-purple-500/20 hover:bg-purple-500/20"}`}
                    >
                      <Users className="w-3 h-3 mr-1" />
                      Konkurencja
                    </Badge>
                    <Badge 
                      onClick={() => toggleCategory("technology")}
                      className={`cursor-pointer transition-all ${selectedCategories.includes("technology") ? "bg-green-600 text-white border-green-500 shadow-lg shadow-green-500/50" : "bg-green-500/10 text-green-400/50 border-green-500/20 hover:bg-green-500/20"}`}
                    >
                      <Cpu className="w-3 h-3 mr-1" />
                      Nowa Technologia
                    </Badge>
                    <Badge 
                      onClick={() => toggleCategory("market")}
                      className={`cursor-pointer transition-all ${selectedCategories.includes("market") ? "bg-orange-600 text-white border-orange-500 shadow-lg shadow-orange-500/50" : "bg-orange-500/10 text-orange-400/50 border-orange-500/20 hover:bg-orange-500/20"}`}
                    >
                      <BarChart3 className="w-3 h-3 mr-1" />
                      Rynek
                    </Badge>
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
                        Add Subcategory
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Subcategory</DialogTitle>
                        <DialogDescription>
                          Create a more specific subcategory under an existing category to better organize your reports.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 pt-4">
                        <div>
                          <Label htmlFor="parent-category">Parent Category</Label>
                          <select
                            id="parent-category"
                            value={newCategoryParent}
                            onChange={(e) => setNewCategoryParent(e.target.value)}
                            className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                          >
                            <option value="regulation">Regulacje Prawne (Law)</option>
                            <option value="competition">Konkurencja (Competition)</option>
                            <option value="technology">Nowa Technologia (Technology)</option>
                            <option value="market">Rynek (Market)</option>
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="subcategory-name">Subcategory Name</Label>
                          <Input
                            id="subcategory-name"
                            placeholder="e.g., Financial Law, Labor Law"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddSubcategory()}
                          />
                        </div>
                        <div>
                          <Label htmlFor="subcategory-description">Description (Optional)</Label>
                          <Input
                            id="subcategory-description"
                            placeholder="Briefly describe what this subcategory covers"
                            value={newCategoryDescription}
                            onChange={(e) => setNewCategoryDescription(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="subcategory-color">Subcategory Color</Label>
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
                          Add Subcategory
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search reports..."
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
                          New
                        </Badge>
                      )}
                      {report.hasAttachment && (
                        <Badge variant="outline" className="text-xs">
                          <FileText className="w-3 h-3 mr-1" />
                          PDF
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
                      <p className="text-xs text-muted-foreground">Filter highlights:</p>
                      {reportDetailCategories.length > 0 && (
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-6 px-2 text-xs"
                          onClick={() => setReportDetailCategories([])}
                        >
                          All Categories
                        </Button>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {/* Dynamically show only categories present in this report */}
                      {Array.from(new Set(selectedReport.highlights.map(h => h.category))).map(category => {
                        const isDefaultCategory = ["regulation", "competition", "technology", "market"].includes(category);
                        const customCat = subcategories.find(c => c.id === category);
                        
                        if (category === "regulation") {
                          return (
                            <Badge 
                              key={category}
                              onClick={() => toggleReportDetailCategory(category)}
                              className={`cursor-pointer transition-all ${reportDetailCategories.includes(category) ? "bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/50" : "bg-blue-500/10 text-blue-400/50 border-blue-500/20 hover:bg-blue-500/20"}`}
                            >
                              <Scale className="w-3 h-3 mr-1" />
                              Regulacje Prawne
                            </Badge>
                          );
                        } else if (category === "competition") {
                          return (
                            <Badge 
                              key={category}
                              onClick={() => toggleReportDetailCategory(category)}
                              className={`cursor-pointer transition-all ${reportDetailCategories.includes(category) ? "bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-500/50" : "bg-purple-500/10 text-purple-400/50 border-purple-500/20 hover:bg-purple-500/20"}`}
                            >
                              <Users className="w-3 h-3 mr-1" />
                              Konkurencja
                            </Badge>
                          );
                        } else if (category === "technology") {
                          return (
                            <Badge 
                              key={category}
                              onClick={() => toggleReportDetailCategory(category)}
                              className={`cursor-pointer transition-all ${reportDetailCategories.includes(category) ? "bg-green-600 text-white border-green-500 shadow-lg shadow-green-500/50" : "bg-green-500/10 text-green-400/50 border-green-500/20 hover:bg-green-500/20"}`}
                            >
                              <Cpu className="w-3 h-3 mr-1" />
                              Nowa Technologia
                            </Badge>
                          );
                        } else if (category === "market") {
                          return (
                            <Badge 
                              key={category}
                              onClick={() => toggleReportDetailCategory(category)}
                              className={`cursor-pointer transition-all ${reportDetailCategories.includes(category) ? "bg-orange-600 text-white border-orange-500 shadow-lg shadow-orange-500/50" : "bg-orange-500/10 text-orange-400/50 border-orange-500/20 hover:bg-orange-500/20"}`}
                            >
                              <BarChart3 className="w-3 h-3 mr-1" />
                              Rynek
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
                  {selectedReport.hasAttachment && (
                    <div className="mb-6 p-4 rounded-lg glass border border-primary/30 flex items-center justify-between hover:border-primary/50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center">
                          <FileText className="w-6 h-6 text-red-400" />
                        </div>
                        <div>
                          <p className="font-medium">Daily Report - {selectedReport.time} Afternoon.pdf</p>
                          <p className="text-sm text-muted-foreground">1.1 MB</p>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  )}

                  <div className="prose prose-invert max-w-none">
                    <p className="text-foreground mb-4">Cześć,</p>
                    <p className="text-foreground mb-6">
                      Oto Twój dzienny raport. Zebraliśmy najnowsze informacje i spostrzeżenia.
                    </p>

                    <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-primary" />
                      Najważniejsze wydarzenia dnia:
                    </h3>

                    <div className="space-y-4">
                      {selectedReport.highlights
                        .filter(highlight => 
                          reportDetailCategories.length === 0 || reportDetailCategories.includes(highlight.category)
                        )
                        .map((highlight) => (
                          <div key={highlight.id} className="p-4 rounded-lg glass border border-border/30">
                            <div className="flex items-center justify-between mb-2">
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
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-6 px-2 text-muted-foreground hover:text-primary"
                                onClick={() => openRetagDialog(highlight.id)}
                              >
                                <Tag className="w-3 h-3 mr-1" />
                                <span className="text-xs">Re-tag</span>
                              </Button>
                            </div>
                            <p className="text-foreground mb-3 leading-relaxed">
                              {highlight.text}
                            </p>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-primary hover:text-primary hover:bg-primary/10 group-hover:translate-x-1 transition-transform"
                              onClick={() => window.open(highlight.notebookUrl, "_blank")}
                            >
                              <Sparkles className="w-4 h-4 mr-2" />
                              Ask for more explanation
                              <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                          </div>
                        ))}
                    </div>

                    <div className="mt-8 p-4 rounded-lg glass border border-border/30">
                      <p className="text-sm text-muted-foreground">
                        Szczegółowe zestawienie znajdziesz w załączonym raporcie PDF.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="glass-strong border-primary/20 h-[calc(100vh-180px)] flex items-center justify-center">
                <CardContent className="text-center">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-purple-vibrant flex items-center justify-center animate-glow">
                    <Inbox className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Select a Report</h3>
                  <p className="text-muted-foreground">
                    Choose a report from the inbox to view its contents and highlights
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
            <DialogTitle>Assign Category</DialogTitle>
            <DialogDescription>
              Select a category to assign to this highlight.
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

