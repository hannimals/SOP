import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/UI/Button";
import { ArrowLeft, Download } from "lucide-react";
import { Card } from "../components/UI/Card";
import MessageCard from "../components/UI/Card_generator";

export default function CardView() {
  const navigate = useNavigate();
  const location = useLocation();
  const { audioUrl, character } = location.state || {};

  if (!audioUrl || !character) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-[var(--color-background)] text-black">
        <Card variant="bordered" className="text-center p-8">
          <p className="text-red-500">Something went wrong. No card data found.</p>
          <Button onClick={() => navigate("/onboarding")} className="mt-4">
            Go Back
          </Button>
        </Card>
      </div>
    );
  }
  return (

    <div className="min-h-screen pt-24 pb-12 px-6 bg-white text-black">
      <div className="max-w-2xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/onboarding")}
          className="mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Tilbage til Redaktøren
        </Button>

        <MessageCard
          character={character}
          audioUrl={audioUrl}
          isGenerating={false}
          onGenerateAudio={() => { }}
          onDownload={() => {
            alert("Download functionality not implemented yet.");
          }}
        />
        <div className="mt-8 text-center text-sm text-gray-600">
          Share this card with your friend on their special day!
        </div>

      </div>
    </div>
  );
}