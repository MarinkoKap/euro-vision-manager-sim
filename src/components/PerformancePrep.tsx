
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import type { Artist, Song, Performance } from '../pages/Index';

interface PerformancePrepProps {
  artist: Artist;
  song: Song;
  onPerformancePrepared: (performance: Performance) => void;
}

const stagingOptions = [
  { name: 'Simple & Elegant', description: 'Classic approach, focus on the artist', impact: 'Safe choice, moderate appeal' },
  { name: 'Spectacular Show', description: 'Big production with dancers and effects', impact: 'High risk, high reward' },
  { name: 'Artistic & Abstract', description: 'Creative visual storytelling', impact: 'Jury favorite, unique appeal' },
  { name: 'Interactive & Modern', description: 'LED screens and modern technology', impact: 'Contemporary and eye-catching' }
];

const costumeOptions = [
  { name: 'Traditional Outfit', description: 'Represent your country\'s culture', impact: 'Cultural bonus, memorable' },
  { name: 'Glamorous Gown/Suit', description: 'Classic Eurovision elegance', impact: 'Safe and sophisticated' },
  { name: 'Avant-garde Fashion', description: 'Bold and unconventional', impact: 'Statement piece, polarizing' },
  { name: 'Themed Costume', description: 'Matches your song concept', impact: 'Cohesive performance' }
];

const choreographyOptions = [
  { name: 'Minimal Movement', description: 'Focus on vocals and emotion', impact: 'Vocal showcase' },
  { name: 'Dynamic Choreography', description: 'Energetic dance moves', impact: 'High energy, entertaining' },
  { name: 'Interpretive Dance', description: 'Artistic expression through movement', impact: 'Artistic impression' },
  { name: 'Group Performance', description: 'Backup dancers and ensemble', impact: 'Grand spectacle' }
];

const effectsOptions = [
  { name: 'Lighting Only', description: 'Strategic use of stage lighting', impact: 'Budget-friendly, effective' },
  { name: 'Pyrotechnics', description: 'Fire, sparks, and explosions', impact: 'Wow factor, memorable moments' },
  { name: 'Special Effects', description: 'Smoke, wind, rain, snow', impact: 'Atmospheric and dramatic' },
  { name: 'Holographic Display', description: 'Cutting-edge visual technology', impact: 'Futuristic and impressive' }
];

const PerformancePrep = ({ artist, song, onPerformancePrepared }: PerformancePrepProps) => {
  const [staging, setStaging] = useState('');
  const [costume, setCostume] = useState('');
  const [choreography, setChoreography] = useState('');
  const [effects, setEffects] = useState('');

  const handleSubmit = () => {
    if (staging && costume && choreography && effects) {
      onPerformancePrepared({
        staging,
        costume,
        choreography,
        effects
      });
    }
  };

  const getPerformanceScore = () => {
    if (!staging || !costume || !choreography || !effects) return null;
    
    let score = (artist.charisma + song.catchiness + song.originality) / 3;
    
    // Add some randomness and bonuses based on choices
    if (staging === 'Spectacular Show') score += 1.5;
    if (costume === 'Avant-garde Fashion') score += 1;
    if (choreography === 'Dynamic Choreography') score += 1;
    if (effects === 'Pyrotechnics') score += 2;
    
    return Math.min(Math.floor(score + Math.random() * 2), 10);
  };

  const performanceScore = getPerformanceScore();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl bg-white/10 backdrop-blur-lg border-white/20 text-white">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Badge className="bg-purple-600">{artist.country}</Badge>
            <Badge className="bg-pink-600">"{song.title}"</Badge>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
            Plan Your Eurovision Performance
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-white font-semibold">Stage Design</Label>
              <Select value={staging} onValueChange={setStaging}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Choose your staging approach" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  {stagingOptions.map((option) => (
                    <SelectItem key={option.name} value={option.name} className="text-white hover:bg-gray-800">
                      <div>
                        <div className="font-semibold">{option.name}</div>
                        <div className="text-sm text-gray-300">{option.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {staging && (
                <div className="text-sm text-gray-300 bg-white/5 p-2 rounded">
                  {stagingOptions.find(o => o.name === staging)?.impact}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-white font-semibold">Costume Design</Label>
              <Select value={costume} onValueChange={setCostume}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select your outfit" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  {costumeOptions.map((option) => (
                    <SelectItem key={option.name} value={option.name} className="text-white hover:bg-gray-800">
                      <div>
                        <div className="font-semibold">{option.name}</div>
                        <div className="text-sm text-gray-300">{option.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {costume && (
                <div className="text-sm text-gray-300 bg-white/5 p-2 rounded">
                  {costumeOptions.find(o => o.name === costume)?.impact}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-white font-semibold">Choreography</Label>
              <Select value={choreography} onValueChange={setChoreography}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Plan your movement" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  {choreographyOptions.map((option) => (
                    <SelectItem key={option.name} value={option.name} className="text-white hover:bg-gray-800">
                      <div>
                        <div className="font-semibold">{option.name}</div>
                        <div className="text-sm text-gray-300">{option.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {choreography && (
                <div className="text-sm text-gray-300 bg-white/5 p-2 rounded">
                  {choreographyOptions.find(o => o.name === choreography)?.impact}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-white font-semibold">Special Effects</Label>
              <Select value={effects} onValueChange={setEffects}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Add your effects" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  {effectsOptions.map((option) => (
                    <SelectItem key={option.name} value={option.name} className="text-white hover:bg-gray-800">
                      <div>
                        <div className="font-semibold">{option.name}</div>
                        <div className="text-sm text-gray-300">{option.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {effects && (
                <div className="text-sm text-gray-300 bg-white/5 p-2 rounded">
                  {effectsOptions.find(o => o.name === effects)?.impact}
                </div>
              )}
            </div>
          </div>

          {performanceScore && (
            <div className="p-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg border border-white/20">
              <h3 className="font-semibold mb-3 text-yellow-400 flex items-center">
                <Star className="w-5 h-5 mr-2" />
                Performance Preview Score
              </h3>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">{performanceScore}/10</div>
                <div className="text-gray-300">Expected Appeal Rating</div>
              </div>
            </div>
          )}

          <Button 
            onClick={handleSubmit}
            disabled={!staging || !costume || !choreography || !effects}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 font-bold py-3 text-lg"
          >
            Ready for Eurovision Competition!
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformancePrep;
