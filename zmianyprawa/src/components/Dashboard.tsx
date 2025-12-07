import { FileText, Scale, Calculator, AlertCircle, CheckCircle2, ArrowRight, MessageSquare, ChevronDown, ArrowDown, MessageSquarePlus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { FeedbackModal } from "./FeedbackModal";

const ScrollIndicator = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrolledToBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
      setIsVisible(!scrolledToBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce flex flex-col items-center gap-2 text-primary z-50 bg-background/80 p-2 rounded-full shadow-lg backdrop-blur-sm border">
      <span className="text-xs font-semibold">Przewiń po więcej</span>
      <ArrowDown className="w-5 h-5" />
    </div>
  );
};

const QuickNav = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
      <Button variant="outline" size="sm" onClick={() => scrollToSection("kpc-header")} className="whitespace-nowrap">
        <Scale className="w-3 h-3 mr-2" />
        Nagłówek
      </Button>
      <Button variant="outline" size="sm" onClick={() => scrollToSection("kpc-key-changes")} className="whitespace-nowrap">
        <CheckCircle2 className="w-3 h-3 mr-2" />
        Kluczowe Zmiany
      </Button>
      <Button variant="outline" size="sm" onClick={() => scrollToSection("kpc-comparison")} className="whitespace-nowrap">
        <FileText className="w-3 h-3 mr-2" />
        Porównanie
      </Button>
      <Button variant="outline" size="sm" onClick={() => scrollToSection("kpc-organization")} className="whitespace-nowrap text-red-600 border-red-200 hover:bg-red-50">
        <AlertCircle className="w-3 h-3 mr-2" />
        Zmiany w Organizacji
      </Button>
    </div>
  );
};



const Dashboard = () => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background p-6">
      <ScrollIndicator />
      <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
      
      <div className="max-w-[1600px] mx-auto space-y-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground tracking-tight">
              Porównanie Zmian Artykułów Prawnych (2024-2025)
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Analiza kluczowych nowelizacji: KPC, KSH oraz PIT
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
              onClick={() => setIsFeedbackOpen(true)}
            >
              <MessageSquarePlus className="w-5 h-5 mr-2" />
              Wyraź swoją opinię o zmianach
            </Button>
            <Badge variant="outline" className="px-4 py-2 text-base">
              Aktualizacja: Wrzesień 2025
            </Badge>
          </div>
        </header>

        <Tabs defaultValue="kpc" className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-auto p-1 bg-muted/50">
            <TabsTrigger value="kpc" className="py-3 text-base data-[state=active]:bg-background data-[state=active]:shadow-sm">
              1. Art. 125 KPC
            </TabsTrigger>
            <TabsTrigger value="ksh" className="py-3 text-base data-[state=active]:bg-background data-[state=active]:shadow-sm">
              2. Art. 444 KSH
            </TabsTrigger>
            <TabsTrigger value="pit" className="py-3 text-base data-[state=active]:bg-background data-[state=active]:shadow-sm">
              3. Art. 7 PIT
            </TabsTrigger>
            <TabsTrigger value="summary" className="py-3 text-base data-[state=active]:bg-background data-[state=active]:shadow-sm">
              Podsumowanie
            </TabsTrigger>
          </TabsList>

          {/* KPC Content */}
          <TabsContent value="kpc" className="space-y-6 mt-6">
            <QuickNav />
            <div id="kpc-header">
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl flex items-center gap-2">
                        <Scale className="w-6 h-6 text-blue-500" />
                        ARTYKUŁ 125 KODEKSU POSTĘPOWANIA CYWILNEGO
                      </CardTitle>
                      <CardDescription className="text-base mt-2">
                        <strong>Zmiana:</strong> Ustawa z dnia 5 sierpnia 2025 r. o zmianie ustawy – Kodeks postępowania cywilnego (Dz.U. 2025 poz. 1172)
                      </CardDescription>
                    </div>
                    <Badge className="bg-blue-500 hover:bg-blue-600 text-lg px-4 py-1">
                      Wejście w życie: 1 marca 2026 r.
                    </Badge>
                  </div>
                </CardHeader>
              </Card>
            </div>

            <div id="kpc-key-changes">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <CardTitle>Najważniejsze zmiany i skutki praktyczne</CardTitle>
                  <Button size="sm" className="gap-2" onClick={() => window.open("http://localhost:8080/", "_blank")}>
                    <MessageSquare className="w-4 h-4" />
                    Porozmawiaj z asystentem
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <span className="font-semibold">Nowa możliwość:</span> Pisma procesowe mogą być wnoszane za pośrednictwem portalu informacyjnego sądów (od 1 marca 2026 r.).
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <span className="font-semibold">Okres przejściowy:</span> Do 1 marca 2027 r. wnoszenie przez portal jest fakultatywne dla pełnomocników zawodowych.
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5" />
                      <div>
                        <span className="font-semibold">Obowiązek od 2027 r.:</span> Elektroniczne wnoszenie pism stanie się obligatoryjne dla adwokatów, radców prawnych i rzeczników patentowych.
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-blue-500 mt-0.5" />
                      <div>
                        <span className="font-semibold">Efekt:</span> Cyfryzacja postępowań cywilnych, usprawnienie procedur, skrócenie czasu postępowań.
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div id="kpc-comparison" className="grid md:grid-cols-2 gap-6">
              <Card className="bg-muted/30">
                <CardHeader>
                  <CardTitle className="text-muted-foreground">Poprzednie brzmienie (2024)</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="whitespace-pre-wrap font-mono text-sm bg-background p-4 rounded-lg border">
{`Art. 125 § 1
Jeżeli przepis szczególny tak stanowi albo dokonano wyboru wnoszenia pism procesowych za pośrednictwem systemu teleinformatycznego, pisma procesowe w tej sprawie wnosi się wyłącznie za pośrednictwem systemu teleinformatycznego. Pisma niewniesione za pośrednictwem systemu teleinformatycznego nie wywołują skutków prawnych, jakie ustawa wiąże z wniesieniem pisma do sądu, o czym sąd poucza wnoszącego pismo.

Art. 125 § 2
W przypadku niewniesienia pisma za pośrednictwem systemu teleinformatycznego przewodniczący zawiadamia wnoszącego pismo o bezskuteczności czynności.`}
                  </pre>
                </CardContent>
              </Card>

              <Card className="bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                <CardHeader>
                  <CardTitle className="text-blue-700 dark:text-blue-400">Nowe brzmienie (2025)</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="whitespace-pre-wrap font-mono text-sm bg-background p-4 rounded-lg border border-blue-200 dark:border-blue-800">
{`Art. 125 § 1
(bez zmian - tekst obowiązujący)
Jeżeli przepis szczególny tak stanowi albo dokonano wyboru wnoszenia pism procesowych za pośrednictwem systemu teleinformatycznego, pisma procesowe w tej sprawie wnosi się wyłącznie za pośrednictwem systemu teleinformatycznego...

Art. 125¹ (NOWY)
§ 1. Pisma procesowe, o których mowa w art. 125 § 1, mogą być wnoszone:
1) za pośrednictwem portalu informacyjnego, o ile przepisy szczególne to przewidują;
2) bezpośrednio między profesjonalnym pełnomocnikiem a sądem.

§ 2. Od dnia 1 marca 2027 r. wnoszenie pism procesowych za pośrednictwem portalu informacyjnego stanie się dla profesjonalnych pełnomocników obowiązkowe.

§ 3. Przepisy dotyczące portalu informacyjnego nie mają zastosowania do postępowań przed Sądem Najwyższym, w postępowaniu wieczystoksięgowym i rejestrowym.`}
                  </pre>
                </CardContent>
              </Card>
            </div>

            <div id="kpc-organization">
              <Card className="border-l-4 border-l-red-500 mt-6">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-red-500" />
                  Wymagane zmiany w organizacji (Przygotowanie do 2027)
                </CardTitle>
                <CardDescription>
                  Działania niezbędne do podjęcia w związku z obligatoryjnym wnoszeniem pism przez portal informacyjny.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-background rounded-lg border shadow-sm">
                    <h4 className="font-semibold mb-2 text-red-600">1. Audyt Techniczny</h4>
                    <p className="text-sm text-muted-foreground">
                      Weryfikacja posiadania kwalifikowanych podpisów elektronicznych przez wszystkich prawników oraz dostępu do Portalu Informacyjnego.
                    </p>
                  </div>
                  <div className="p-4 bg-background rounded-lg border shadow-sm">
                    <h4 className="font-semibold mb-2 text-red-600">2. Szkolenia Zespołu</h4>
                    <p className="text-sm text-muted-foreground">
                      Obowiązkowe warsztaty z obsługi Portalu Informacyjnego Sądów Powszechnych dla działu prawnego i administracji.
                    </p>
                  </div>
                  <div className="p-4 bg-background rounded-lg border shadow-sm">
                    <h4 className="font-semibold mb-2 text-red-600">3. Aktualizacja Procedur</h4>
                    <p className="text-sm text-muted-foreground">
                      Dostosowanie wewnętrznego regulaminu pracy i obiegu dokumentów do wymogów cyfrowej komunikacji z sądami.
                    </p>
                  </div>
                </div>

                <div className="bg-muted/30 p-6 rounded-lg border">
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Podgląd zmian w Regulaminie Organizacyjnym (DRAFT)
                  </h4>
                  <div className="bg-background p-4 rounded border font-mono text-sm space-y-4">
                    <div className="border-b pb-2">
                      <p className="font-bold text-center">ANEKS NR 1/2025</p>
                      <p className="text-center text-muted-foreground">do Regulaminu Organizacyjnego Kancelarii / Działu Prawnego</p>
                    </div>
                    <div>
                      <p className="font-bold mb-1">§ 12. Komunikacja z Sądami i Organami Administracji</p>
                      <p className="pl-4 text-muted-foreground line-through mb-1">1. Podstawową formą komunikacji z sądami jest forma pisemna (przesyłka polecona).</p>
                      <p className="pl-4 bg-green-50 dark:bg-green-900/20 p-1 rounded">
                        1. Od dnia 1 marca 2027 r. wszelka korespondencja z sądami w sprawach cywilnych prowadzona jest <span className="font-bold">wyłącznie</span> za pośrednictwem Portalu Informacyjnego Sądów Powszechnych, chyba że przepisy szczególne stanowią inaczej.
                      </p>
                    </div>
                    <div>
                      <p className="font-bold mb-1">§ 13. Obowiązki Pracowników Merytorycznych</p>
                      <p className="pl-4">1. Każdy radca prawny i adwokat współpracujący z Kancelarią zobowiązany jest do:</p>
                      <ul className="list-disc list-inside pl-8 space-y-1 mt-1">
                        <li>Posiadania aktywnego konta w Portalu Informacyjnym z rolą "Pełnomocnik zawodowy".</li>
                        <li>Utrzymywania ważnego kwalifikowanego podpisu elektronicznego.</li>
                        <li>Codziennego monitorowania powiadomień w systemie (do godz. 10:00).</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            </div>
          </TabsContent>

          {/* KSH Content */}
          <TabsContent value="ksh" className="space-y-6 mt-6">
            <Card className="border-l-4 border-l-purple-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <FileText className="w-6 h-6 text-purple-500" />
                      ARTYKUŁ 444 KODEKSU SPÓŁEK HANDLOWYCH
                    </CardTitle>
                    <CardDescription className="text-base mt-2">
                      <strong>Zmiana:</strong> Zmiany wynikające z planowanej nowelizacji (projekt w konsultacjach - wrzesień 2025)
                    </CardDescription>
                  </div>
                  <Badge className="bg-purple-500 hover:bg-purple-600 text-lg px-4 py-1">
                    Planowane: 2026 r.
                  </Badge>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle>Najważniejsze zmiany i skutki praktyczne</CardTitle>
                <Button size="sm" className="gap-2" onClick={() => window.open("http://localhost:8080/", "_blank")}>
                  <MessageSquare className="w-4 h-4" />
                  Porozmawiaj z asystentem
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <span className="font-semibold">Uproszczenie systemu:</span> Likwidacja tradycyjnego podziału na akcje imienne/na okaziciela.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <span className="font-semibold">Lepsza transparentność:</span> Pełna ewidencja akcjonariuszy w systemach rejestrowych.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5" />
                    <div>
                      <span className="font-semibold">Bezpieczeństwo obrotu:</span> Wzmocniony nadzór sądów nad rejestracją akcji.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-purple-500 mt-0.5" />
                    <div>
                      <span className="font-semibold">Przedłużony okres przejściowy:</span> Więcej czasu na dostosowanie (4 lata od wejścia ustawy w życie).
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-muted/30">
                <CardHeader>
                  <CardTitle className="text-muted-foreground">Obecne brzmienie</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px] w-full rounded-md border bg-background p-4">
                    <pre className="whitespace-pre-wrap font-mono text-sm">
{`Art. 444 § 1
Statut może upoważnić zarząd na okres nie dłuższy niż trzy lata do podwyższenia kapitału zakładowego na zasadach określonych w niniejszym rozdziale. Zarząd może wykonać przyznane mu upoważnienie przez dokonanie jednego albo kilku kolejnych podwyższeń kapitału zakładowego w granicach określonych w § 3 (kapitał docelowy).

Art. 444 § 2
Upoważnienie zarządu do podwyższenia kapitału zakładowego może zostać udzielone na kolejne okresy, nie dłuższe jednak niż trzy lata. Udzielenie upoważnienia wymaga zmiany statutu.

Art. 444 § 3
Wysokość kapitału docelowego nie może przekraczać trzech czwartych kapitału zakładowego na dzień udzielenia upoważnienia zarządowi.

Art. 444 § 4
Zarząd może przyznać akcje tylko w zamian za wkłady pieniężne, chyba że upoważnienie do podwyższenia kapitału zakładowego przewiduje możliwość objęcia akcji za wkłady niepieniężne.

Art. 444 § 5
Upoważnienie zarządu do podwyższenia kapitału nie może obejmować uprawnienia do podwyższenia kapitału ze środków własnych spółki.

Art. 444 § 6
Zarząd nie może przyznawać akcji uprzywilejowanych ani uprawnień, o których mowa w art. 354 (osobiste uprawnienia akcjonariusza).

Art. 444 § 7
Upoważnienie zarządu do podwyższenia kapitału zakładowego może przewidywać emitowanie warrantów subskrypcyjnych...`}
                    </pre>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card className="bg-purple-50/50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800">
                <CardHeader>
                  <CardTitle className="text-purple-700 dark:text-purple-400">Planowane zmiany (Nowelizacja)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 p-4">
                    <h4 className="font-semibold text-lg">Nowe regulacje będą dotyczyć:</h4>
                    <ul className="space-y-3 list-disc list-inside">
                      <li>
                        <strong>Dematerializacji akcji</strong> – likwidacja podziału na akcje imienne i na okaziciela (wszystkie staną się akcjami rejestrowymi).
                      </li>
                      <li>
                        <strong>Wymagania informacyjne</strong> – zwiększenie ujawniania w KRS danych o podmiotach prowadzących rejestry akcjonariuszy.
                      </li>
                      <li>
                        <strong>Nadzór sądowy</strong> – sądy będą miały możliwość wszczęcia postępowania przymuszającego wobec spółek niespełniających obowiązków.
                      </li>
                      <li>
                        <strong>Moc dowodowa dokumentów akcji</strong> – przedłużenie z 5 na 7 lat od ogłoszenia (akcje stracą moc dowodową 1 marca 2028 r. zamiast 2026 r.).
                      </li>
                    </ul>
                    <div className="mt-4 p-4 bg-background rounded-lg border border-purple-200 dark:border-purple-800">
                      <p className="font-medium">Szczegóły dotyczące Art. 444:</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Przepisy art. 444 pozostaną w zasadzie bez zmian, ale kontekst ich stosowania zmieni się drastycznie ze względu na nowy sposób rejestracji i ewidencji akcji.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* PIT Content */}
          <TabsContent value="pit" className="space-y-6 mt-6">
            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Calculator className="w-6 h-6 text-green-500" />
                      ARTYKUŁ 7 USTAWY O PODATKU DOCHODOWYM (PIT)
                    </CardTitle>
                    <CardDescription className="text-base mt-2">
                      <strong>Zmiana:</strong> Projekt ustawy o zmianie ustawy o PIT (w konsultacjach)
                    </CardDescription>
                  </div>
                  <Badge className="bg-green-500 hover:bg-green-600 text-lg px-4 py-1">
                    Planowane: 1 stycznia 2026 r.
                  </Badge>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle>Najważniejsze zmiany i skutki praktyczne</CardTitle>
                <Button size="sm" className="gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Porozmawiaj z asystentem
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <span className="font-semibold">Uwzględnienie e-commerce:</span> Dochody dzieci z biznesu online będą regulowane nowszymi przepisami.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <span className="font-semibold">Większa jasność:</span> Precyzyjne zdefiniowanie, które przychody są opodatkowane u rodziców.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5" />
                    <div>
                      <span className="font-semibold">Bezpieczeństwo podatkowe:</span> Mniej interpretacyjnych wątpliwości w sprawach podatku od dochodów dzieci.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-muted/30">
                <CardHeader>
                  <CardTitle className="text-muted-foreground">Obecne brzmienie</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="whitespace-pre-wrap font-mono text-sm bg-background p-4 rounded-lg border">
{`Art. 7 § 1
Dochody małoletnich dzieci własnych i przysposobionych, z wyjątkiem dochodów z ich pracy, rent, stypendiów oraz dochodów z przedmiotów oddanych im do swobodnego użytku, podlegające opodatkowaniu na terytorium Rzeczypospolitej Polskiej, dolicza się do dochodów rodziców, chyba że rodzicom nie przysługuje prawo pobierania pożytków ze źródeł przychodów dzieci.

Art. 7 § 2
Jeżeli małżonkowie podlegają odrębnemu opodatkowaniu, dochody małoletnich dzieci dolicza się po połowie do dochodu każdego z małżonków.

Art. 7 § 3
Przepis ust. 2 nie ma zastosowania do małżonków, w stosunku do których orzeczono separację w rozumieniu odrębnych przepisów.`}
                  </pre>
                </CardContent>
              </Card>

              <Card className="bg-green-50/50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                <CardHeader>
                  <CardTitle className="text-green-700 dark:text-green-400">Planowane zmiany (Projekt)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 p-4">
                    <h4 className="font-semibold text-lg">Proponowane zmiany obejmują:</h4>
                    <ul className="space-y-3 list-disc list-inside">
                      <li>
                        <strong>Doprecyzowanie zakresu dochodów</strong> – wyjaśnienie, które dochody małoletnich dzieci powinny być doliczane do dochodów rodziców.
                      </li>
                      <li>
                        <strong>Rozszerzenie regulacji</strong> – uwzględnienie nowych form zarabiania dzieci (np. przychody z mediów społecznościowych, platform cyfrowych).
                      </li>
                      <li>
                        <strong>Zmiany w interpretacji</strong> – precyzyjne określenie, jakie dochody z pracy mają być wyłączone z doliczania.
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Summary Content */}
          <TabsContent value="summary" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Podsumowanie dla Przedsiębiorcy i Prawnika</CardTitle>
                <CardDescription>Zestawienie najbardziej istotnych zmian i rekomendacje</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[150px]">Artykuł</TableHead>
                      <TableHead>Ustawa</TableHead>
                      <TableHead>Zmiana</TableHead>
                      <TableHead>Skutek</TableHead>
                      <TableHead className="text-right">Data wejścia</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">125 KPC</TableCell>
                      <TableCell>Kodeks postępowania cywilnego</TableCell>
                      <TableCell>Wnoszenie pism przez portal sądowy, cyfryzacja procedur</TableCell>
                      <TableCell>Możliwość szybszego składania pism, od 2027 obowiązkowe dla pełnomocników</TableCell>
                      <TableCell className="text-right">01.03.2026</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">444 KSH</TableCell>
                      <TableCell>Kodeks spółek handlowych</TableCell>
                      <TableCell>Dematerializacja akcji, likwidacja podziału imienne/okaziciel</TableCell>
                      <TableCell>Lepsza transparentność, większe bezpieczeństwo obrotu akcjami</TableCell>
                      <TableCell className="text-right">2026 r.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">7 PIT</TableCell>
                      <TableCell>Ustawa o PIT</TableCell>
                      <TableCell>Doprecyzowanie dochodów małoletnich dzieci</TableCell>
                      <TableCell>Większa jasność w opodatkowaniu dochodów dzieci</TableCell>
                      <TableCell className="text-right">01.01.2026</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                  Rekomendacje
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-4 bg-background rounded-lg border shadow-sm">
                    <h4 className="font-semibold mb-2 text-primary">Dla Prawników</h4>
                    <p className="text-sm text-muted-foreground">
                      Przygotować się do pełnych zmian w procedurze cywilnej; uwzględnić cyfryzację w strategii obsługi klientów.
                    </p>
                  </div>
                  <div className="p-4 bg-background rounded-lg border shadow-sm">
                    <h4 className="font-semibold mb-2 text-primary">Dla Spółek Akcyjnych</h4>
                    <p className="text-sm text-muted-foreground">
                      Przygotować się do dostosowania ewidencji akcji do nowych standardów dematerializacji.
                    </p>
                  </div>
                  <div className="p-4 bg-background rounded-lg border shadow-sm">
                    <h4 className="font-semibold mb-2 text-primary">Dla Podatników</h4>
                    <p className="text-sm text-muted-foreground">
                      Śledzić ostateczne brzmienie zmian w PIT i dostosować strategie rozliczeniowe, zwłaszcza w kontekście dochodów dzieci.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
