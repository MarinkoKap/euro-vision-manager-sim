
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import type { Artist } from '../pages/Index';

interface ArtistCreationProps {
  onArtistCreated: (artist: Artist) => void;
}

const countries = [
  'Sweden', 'Norway', 'Finland', 'Denmark', 'Iceland', 'United Kingdom', 'Ireland', 
  'Netherlands', 'Germany', 'France', 'Italy', 'Spain', 'Portugal', 'Switzerland',
  'Austria', 'Belgium', 'Poland', 'Czech Republic', 'Ukraine', 'Russia', 'Greece',
  'Cyprus', 'Malta', 'Australia', 'Israel', 'Azerbaijan', 'Armenia', 'Georgia'
];

const genres = [
  { name: 'Pop', bonus: { charisma: 2, vocals: 1 } },
  { name: 'Rock', bonus: { charisma: 3, experience: 1 } },
  { name: 'Ballad', bonus: { vocals: 3, experience: 1 } },
  { name: 'Folk', bonus: { experience: 2, vocals: 2 } },
  { name: 'Electronic', bonus: { charisma: 1, experience: 2 } },
  { name: 'Alternative', bonus: { experience: 3, vocals: 1 } }
];

const ArtistCreation = ({ onArtistCreated }: ArtistCreationProps) => {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [genre, setGenre] = useState('');
  const [baseStats] = useState(() => ({
    experience: Math.floor(Math.random() * 5) + 3,
    charisma: Math.floor(Math.random() * 5) + 3,
    vocals: Math.floor(Math.random() * 5) + 3
  }));

  const selectedGenre = genres.find(g => g.name === genre);
  const finalStats = selectedGenre ? {
    experience: baseStats.experience + (selectedGenre.bonus.experience || 0),
    charisma: baseStats.charisma + (selectedGenre.bonus.charisma || 0),
    vocals: baseStats.vocals + (selectedGenre.bonus.vocals || 0)
  } : baseStats;

  const handleSubmit = () => {
    if (name && country && genre) {
      onArtistCreated({
        name,
        country,
        genre,
        ...finalStats
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white/10 backdrop-blur-lg border-white/20 text-white">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
            Create Your Eurovision Artist
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="artistName" className="text-white">Artist Name</Label>
            <Input
              id="artistName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your artist's name"
              className="bg-white/10 border-white/20 text-white placeholder-gray-300"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Country</Label>
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                {countries.map((c) => (
                  <SelectItem key={c} value={c} className="text-white hover:bg-gray-800">
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-white">Music Genre</Label>
            <Select value={genre} onValueChange={setGenre}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select your genre" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                {genres.map((g) => (
                  <SelectItem key={g.name} value={g.name} className="text-white hover:bg-gray-800">
                    {g.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedGenre && (
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <h3 className="font-semibold mb-3 text-yellow-400">Artist Stats</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{finalStats.experience}</div>
                  <div className="text-sm text-gray-300">Experience</div>
                  <div className="flex justify-center mt-1">
                    {[...Array(Math.min(finalStats.experience, 8))].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{finalStats.charisma}</div>
                  <div className="text-sm text-gray-300">Charisma</div>
                  <div className="flex justify-center mt-1">
                    {[...Array(Math.min(finalStats.charisma, 8))].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-pink-400 fill-current" />
                    ))}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{finalStats.vocals}</div>
                  <div className="text-sm text-gray-300">Vocals</div>
                  <div className="flex justify-center mt-1">
                    {[...Array(Math.min(finalStats.vocals, 8))].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-blue-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <Button 
            onClick={handleSubmit}
            disabled={!name || !country || !genre}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 font-bold py-3"
          >
            Create Artist & Choose Song
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArtistCreation;
