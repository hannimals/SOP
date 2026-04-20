import { useState } from "react";

interface Character {
    value: string;
    label: string;
    image: string;
}

const characters: Character[] = [
    {
        value: "mickey",
        label: "Mickey",
        image: new URL("../../assets/mikeyFace.png", import.meta.url).href,
    },
    {
        value: "sonic",
        label: "Sonic",
        image: new URL("../../assets/soniFace.png", import.meta.url).href,
    },
    {
        value: "twilight",
        label: "Twilight",
        image: new URL("../../assets/twillightFace.png", import.meta.url).href,
    },
];

interface CharacterSelectorProps {
    value: string;
    onChange: (value: string) => void;
}

export default function CharacterSelector({ value, onChange }: CharacterSelectorProps) {
    return (
        <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
                Vælg din yndlingskarakter!
            </label>

            <div className="flex h-28 gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                {characters.map((char) => {
                    const isSelected = value === char.value;

                    return (
                        <div
                            key={char.value}
                            onClick={() => onChange(char.value)}
                            className={`flex-shrink-0 w-20 h-20 mt-auto ml-auto rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 snap-center
                ${isSelected
                                    ? "ring-4 ring-[var(--color-accent)] scale-110 shadow-xl"
                                    : "hover:scale-105 hover:shadow-md"
                                }
              `}
                        >
                            <img
                                src={char.image}
                                alt={char.label}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    );
                })}
            </div>

            <p className="text-xs text-[var(--color-muted)]">
                Tryk på en karakter for at vælge
            </p>
        </div>
    );
}