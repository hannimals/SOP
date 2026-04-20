import { Card } from "./Card";
import { Button } from "./Button";
import { Play, Loader2, Download } from "lucide-react";

const gifMap: Record<string, string> = {
  mickey: new URL("../../assets/miki.gif", import.meta.url).href,
  sonic: new URL("../../assets/sonic.gif", import.meta.url).href,
  twilight: new URL("../../assets/twilight.gif", import.meta.url).href,
};

interface CardGeneratorProps {
  character: string;
  audioUrl: string;
  isGenerating: boolean;
  onGenerateAudio: () => void;
  onDownload: () => void;
}

export default function MessageCard({
  character,
  audioUrl,
  isGenerating,
  onGenerateAudio,
  onDownload
}: CardGeneratorProps) {

  const characterName = character.charAt(0).toUpperCase() + character.slice(1);
  const selectedGif = gifMap[character];
  return (
    <Card variant="bordered" className="overflow-hidden bg-white text-black shadow-xl">
      <div className="relative bg-gradient-to-br from-pink-100 via-purple-100 to-violet-100 flex items-center justify-center border-b border-[var(--color-border)] rounded-3xl">
        <div className="p-4 w-full h-full">
          {selectedGif ? (
            <img src={selectedGif} alt={`${characterName} animation`} className="w-full p-2 h-full object-cover rounded-xl" />
          ) : (
            <div className="w-80 h-80 bg-white rounded-3xl flex items-center justify-center text-9xl shadow-inner">
              🎂
            </div>)}
        </div>
        <div className="absolute top-8 right-8 bg-white/95 backdrop-blur-sm px-6 py-2 rounded-2xl text-lg font-bold shadow-lg border border-white">
          🎉 Tillykke med fødselsdagen!
        </div>
      </div>
      <div className="p-2 space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-3 text-center">
            Besked fra {characterName}
          </h2>
        </div>

      </div>
      {audioUrl && (
        <div>
          <h3 className="text-lg font-semibold mb-4 text-left text-[var(--color-muted)]">Lyt til beskeden:</h3>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-3xl border border-purple-100 shadow-inner">
            <audio
              controls
              className="w-full accent-[var(--color-accent)]"
              src={audioUrl}
            >
              Your browser does not support audio playback. (Din browser understøtter ikke afspilning af lyd.)
            </audio>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-3">


        {audioUrl && onDownload && (
          <Button
            variant="secondary"
            onClick={onDownload}
            className="mt-4 py-6"
          >
            <Download className="w-5 h-5 mr-2" />
            Download hilsen
          </Button>
        )}
      </div>
    </Card>
  );
}   