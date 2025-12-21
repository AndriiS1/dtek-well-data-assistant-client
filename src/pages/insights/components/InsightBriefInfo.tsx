import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

interface InsightBriefProps {
  highlights: string[];
  suspicions: string[];
  recommendedActions: string[];
}

export function InsightBriefInfo({
  highlights,
  suspicions,
  recommendedActions,
}: InsightBriefProps) {
  const renderTrendIcon = (text: string) => {
    if (text.includes("зросла") || text.includes("зріс"))
      return <TrendingUp className="h-3 w-3 text-blue-500 inline mr-1" />;
    if (text.includes("знизився") || text.includes("знизилася"))
      return <TrendingDown className="h-3 w-3 text-indigo-500 inline mr-1" />;
    return null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="border-t-4 border-t-blue-500 shadow-sm">
        <CardHeader className="flex flex-row items-center gap-2 pb-2">
          <Lightbulb className="h-5 w-5 text-blue-500" />
          <CardTitle className="text-base font-bold uppercase tracking-tight">
            Ключові показники
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {highlights.map((item, i) => (
              <li
                key={i}
                className="text-sm text-slate-700 leading-relaxed flex items-start"
              >
                <span className="mt-1 mr-2">{renderTrendIcon(item)}</span>
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="border-t-4 border-t-amber-500 shadow-sm bg-amber-50/30">
        <CardHeader className="flex flex-row items-center gap-2 pb-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          <CardTitle className="text-base font-bold uppercase tracking-tight">
            Підозри
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {suspicions.map((item, i) => (
              <li
                key={i}
                className="text-sm text-slate-700 leading-relaxed flex items-start italic"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-2 mr-2 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="border-t-4 border-t-emerald-500 shadow-sm">
        <CardHeader className="flex flex-row items-center gap-2 pb-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
          <CardTitle className="text-base font-bold uppercase tracking-tight">
            Рекомендації
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {recommendedActions.map((item, i) => (
              <li
                key={i}
                className="group flex items-start gap-3 p-2 rounded-md hover:bg-emerald-50 transition-colors cursor-default"
              >
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-700 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                  {i + 1}
                </div>
                <p className="text-sm text-slate-700 font-medium leading-tight">
                  {item}
                </p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
