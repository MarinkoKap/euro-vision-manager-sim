
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Music } from "lucide-react";
import type { Artist, Song } from '../pages/Index';

interface SongSelectionProps {
  artist: Artist;
  onSongSelected: (song: Song) => void;
}

const songGenres = ['Pop', 'Rock', 'Ballad', 'Folk', 'Electronic', 'Alternative', 'Opera', 'Rap'];
const tempos = ['Slow', 'Medium', 'Fast', 'Variable'];
const languages = ['English', 'Native Language', 'Made-up Language', 'Instrumental'];

const SongSelection = ({ artist, onSongSelected }: SongSelectionProps) => {
  const [title, setTitle] = useState('');
  const [songGenre, setSongGenre] = useState('');
  const [tempo, setTempo] = useState('');
  const [language, setLanguage] = useState('');

  const calculateSongStats = () => {
    let catchiness = Math.floor(Math.random() * 4) + 3;
    let originality = Math.floor(Math.random() * 4) + 3;

    // Genre matching bonus
    if (songGenre === artist.genre) {
      catchiness += 2;
      originality += 1;
    }

    // Tempo bonuses
    if (tempo === 'Fast' && (songGenre === 'Pop' || songGenre === 'Electronic')) {
      catchiness += 1;
    }
    if (tempo === 'Slow' && songGenre === 'Ballad') {
      originality += 2;
    }

    // Language bonuses
    if (language === 'English') {
      catchiness += 1;
    }
    if (language === 'Native Language') {
      originality += 1;
    }

    return { catchiness: Math.min(catchiness, 10), originality: Math.min(originality, 10) };
  };

  const stats = (title && songGenre && tempo && language) ? calculateSongStats() : null;

  const handleSubmit = () => {
    if (title && songGenre && tempo && language && stats) {
      onSongSelected({
        title,
        genre: songGenre,
        tempo,
        language,
        catchiness: stats.catchiness,
        originality: stats.originality
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white/10 backdrop-blur-lg border-white/20 text-white">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Badge className="bg-purple-600">{artist.country}</Badge>
            <Badge className="bg-pink-600">{artist.name}</Badge>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
            Choose Your Eurovision Song
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="songTitle" className="text-white">Song Title</Label>
            <Input
              id="songTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your song title"
              className="bg-white/10 border-white/20 text-white placeholder-gray-300"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white">Genre</Label>
              <Select value={songGenre} onValueChange={setSongGenre}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  {songGenres.map((g) => (
                    <SelectItem key={g} value={g} className="text-white hover:bg-gray-800">
                      {g} {g === artist.genre && '⭐ (Your specialty)'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Tempo</Label>
              <Select value={tempo} onValueChange={setTempo}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select tempo" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  {tempos.map((t) => (
                    <SelectItem key={t} value={t} className="text-white hover:bg-gray-800">
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-white">Language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                {languages.map((l) => (
                  <SelectItem key={l} value={l} className="text-white hover:bg-gray-800">
                    {l}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {stats && (
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <h3 className="font-semibold mb-3 text-yellow-400 flex items-center">
                <Music className="w-5 h-5 mr-2" />
                Song Analysis
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-400">{stats.catchiness}/10</div>
                  <div className="text-sm text-gray-300">Catchiness</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{stats.originality}/10</div>
                  <div className="text-sm text-gray-300">Originality</div>
                </div>
              </div>
              {songGenre === artist.genre && (
                <Badge className="mt-2 bg-green-600">Perfect genre match! Bonus points!</Badge>
              )}
            </div>
          )}

          <Button 
            onClick={handleSubmit}
            disabled={!title || !songGenre || !tempo || !language}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 font-bold py-3"
          >
            Finalize Song & Plan Performance
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SongSelection;
