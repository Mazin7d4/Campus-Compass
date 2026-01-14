import { Card, CardContent } from "@/components/ui/card";

type EmptyStateProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export function EmptyState({ icon, title, description }: EmptyStateProps) {
  return (
    <Card className="w-full mt-8">
      <CardContent className="flex flex-col items-center justify-center p-12 text-center">
        <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-secondary text-secondary-foreground">
          <div className="[&>svg]:w-8 [&>svg]:h-8">{icon}</div>
        </div>
        <h3 className="font-headline text-2xl font-semibold tracking-tight">
          {title}
        </h3>
        <p className="text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
}
