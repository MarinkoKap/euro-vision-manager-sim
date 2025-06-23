
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Star, Music, Ticket } from "lucide-react";
import type { Artist, Song, Performance } from '../pages/Index';

interface ResultsProps {
  artist: Artist;
  song: Song | null;
  performance: Performance | null;
  finalScore: number;
  onBackToMenu: () => void;
}

const Results = ({ artist, song, performance, finalScore, onBackToMenu }: ResultsProps) => {
  const getPlacement = (score: number) => {
    if (score >= 500) return { 
      place: '1st Place', 
      color: 'text-yellow-400', 
      message: 'Eurovision Winner! 🏆',
      description: 'Incredible! You\'ve won Eurovision! Your artist will be remembered forever!',
      emoji: '👑'
    };
    if (score >= 400) return { 
      place: 'Top 3', 
      color: 'text-orange-400', 
      message: 'Podium Finish! 🥉',
      description: 'Amazing performance! You made it to the podium at Eurovision!',
      emoji: '🥉'
    };
    if (score >= 300) return { 
      place: 'Top 10', 
      color: 'text-green-400', 
      message: 'Great Performance! ⭐',
      description: 'Well done! A top 10 finish at Eurovision is a fantastic achievement!',
      emoji: '⭐'
    };
    if (score >= 200) return { 
      place: 'Top 15', 
      color: 'text-blue-400', 
      message: 'Solid Result! 👏',
      description: 'Good job! You put on a memorable show and scored well!',
      emoji: '👏'
    };
    if (score >= 100) return { 
      place: 'Qualified', 
      color: 'text-purple-400', 
      message: 'Made it to Final! 🎉',
      description: 'You qualified for the Grand Final! That\'s already a success!',
      emoji: '🎉'
    };
    return { 
      place: 'Semi-Final', 
      color: 'text-gray-400', 
      message: 'Better luck next year! 💙',
      description: 'The competition was tough, but you gave it your best shot!',
      emoji: '💙'
    };
  };

  const result = getPlacement(finalScore);

  const getGrade = (score: number) => {
    if (score >= 500) return 'S';
    if (score >= 400) return 'A+';
    if (score >= 300) return 'A';
    if (score >= 200) return 'B';
    if (score >= 100) return 'C';
    return 'D';
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl bg-white/10 backdrop-blur-lg border-white/20 text-white">
        <CardHeader className="text-center">
          <div className="text-8xl mb-4">{result.emoji}</div>
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Eurovision 2024 Results
          </CardTitle>
          <div className={`text-3xl font-bold ${result.color} mb-2`}>
            {result.place}
          </div>
          <p className="text-xl text-gray-300">{result.message}</p>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {/* Final Score Display */}
          <div className="text-center p-6 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg border border-white/20">
            <div className="text-6xl font-bold text-white mb-2">{finalScore}</div>
            <div className="text-xl text-gray-300 mb-2">Total Points</div>
            <Badge className={`text-2xl px-4 py-2 ${result.color === 'text-yellow-400' ? 'bg-yellow-600' : 'bg-purple-600'}`}>
              Grade: {getGrade(finalScore)}
            </Badge>
          </div>

          {/* Performance Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-yellow-400 flex items-center">
                <Star className="w-6 h-6 mr-2" />
                Your Artist
              </h3>
              <div className="space-y-2 p-4 bg-white/5 rounded-lg">
                <div className="flex justify-between">
                  <span>Name:</span>
                  <span className="font-semibold">{artist.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Country:</span>
                  <Badge className="bg-purple-600">{artist.country}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Genre:</span>
                  <span>{artist.genre}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-4">
                  <div className="text-center">
                    <div className="font-bold">{artist.experience}</div>
                    <div className="text-xs text-gray-400">Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold">{artist.charisma}</div>
                    <div className="text-xs text-gray-400">Charisma</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold">{artist.vocals}</div>
                    <div className="text-xs text-gray-400">Vocals</div>
                  </div>
                </div>
              </div>
            </div>

            {song && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-pink-400 flex items-center">
                  <Music className="w-6 h-6 mr-2" />
                  Your Song
                </h3>
                <div className="space-y-2 p-4 bg-white/5 rounded-lg">
                  <div className="flex justify-between">
                    <span>Title:</span>
                    <span className="font-semibold">"{song.title}"</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Genre:</span>
                    <span>{song.genre}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tempo:</span>
                    <span>{song.tempo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Language:</span>
                    <span>{song.language}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="text-center">
                      <div className="font-bold">{song.catchiness}/10</div>
                      <div className="text-xs text-gray-400">Catchiness</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold">{song.originality}/10</div>
                      <div className="text-xs text-gray-400">Originality</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {performance && (
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-blue-400 flex items-center">
                <Award className="w-6 h-6 mr-2" />
                Your Performance
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 bg-white/5 rounded-lg text-center">
                  <div className="font-semibold text-sm mb-1">Staging</div>
                  <div className="text-xs text-gray-300">{performance.staging}</div>
                </div>
                <div className="p-3 bg-white/5 rounded-lg text-center">
                  <div className="font-semibold text-sm mb-1">Costume</div>
                  <div className="text-xs text-gray-300">{performance.costume}</div>
                </div>
                <div className="p-3 bg-white/5 rounded-lg text-center">
                  <div className="font-semibold text-sm mb-1">Choreography</div>
                  <div className="text-xs text-gray-300">{performance.choreography}</div>
                </div>
                <div className="p-3 bg-white/5 rounded-lg text-center">
                  <div className="font-semibold text-sm mb-1">Effects</div>
                  <div className="text-xs text-gray-300">{performance.effects}</div>
                </div>
              </div>
            </div>
          )}

          {/* Feedback */}
          <div className="p-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg border border-white/20">
            <h3 className="text-xl font-bold mb-3 text-center">Final Thoughts</h3>
            <p className="text-center text-gray-300 text-lg">{result.description}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={onBackToMenu}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-bold py-3 px-8"
            >
              <Ticket className="w-5 h-5 mr-2" />
              Play Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Results;
