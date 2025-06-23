
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Star, Award, Music } from "lucide-react";
import type { Artist, Song, Performance } from '../pages/Index';

interface CompetitionProps {
  artist: Artist;
  song: Song;
  performance: Performance;
  onComplete: (finalScore: number) => void;
}

type CompetitionPhase = 'intro' | 'rehearsal' | 'semifinal' | 'final' | 'voting';

const Competition = ({ artist, song, performance, onComplete }: CompetitionProps) => {
  const [phase, setPhase] = useState<CompetitionPhase>('intro');
  const [rehearsalScore, setRehearsalScore] = useState(0);
  const [semiFinalScore, setSemiFinalScore] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [votingProgress, setVotingProgress] = useState(0);

  const calculateScore = (baseMultiplier: number = 1) => {
    const artistScore = (artist.experience + artist.charisma + artist.vocals) / 3;
    const songScore = (song.catchiness + song.originality) / 2;
    const performanceBonus = getPerformanceBonus();
    const randomFactor = Math.random() * 2 + 0.5; // 0.5 to 2.5 multiplier
    
    return Math.min(Math.floor((artistScore + songScore + performanceBonus) * baseMultiplier * randomFactor), 600);
  };

  const getPerformanceBonus = () => {
    let bonus = 0;
    if (performance.staging === 'Spectacular Show') bonus += 1;
    if (performance.costume === 'Avant-garde Fashion') bonus += 0.5;
    if (performance.choreography === 'Dynamic Choreography') bonus += 1;
    if (performance.effects === 'Pyrotechnics') bonus += 1.5;
    return bonus;
  };

  const simulatePhase = async (phaseName: string, scoreMultiplier: number) => {
    setIsSimulating(true);
    
    // Simulate some delay for tension
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const score = calculateScore(scoreMultiplier);
    
    if (phaseName === 'rehearsal') {
      setRehearsalScore(score);
      setPhase('semifinal');
    } else if (phaseName === 'semifinal') {
      setSemiFinalScore(score);
      if (score >= 100) { // Qualify for final
        setPhase('final');
      } else {
        onComplete(score);
      }
    } else if (phaseName === 'final') {
      setFinalScore(score);
      setPhase('voting');
      simulateVoting(score);
    }
    
    setIsSimulating(false);
  };

  const simulateVoting = async (score: number) => {
    // Simulate live voting with progress bar
    for (let i = 0; i <= 100; i += 5) {
      setVotingProgress(i);
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    onComplete(score);
  };

  const getPlacement = (score: number) => {
    if (score >= 500) return { place: '1st', color: 'text-yellow-400', message: 'Eurovision Winner! 🏆' };
    if (score >= 400) return { place: 'Top 3', color: 'text-orange-400', message: 'Podium Finish! 🥉' };
    if (score >= 300) return { place: 'Top 10', color: 'text-green-400', message: 'Great Performance! ⭐' };
    if (score >= 200) return { place: 'Top 15', color: 'text-blue-400', message: 'Solid Result! 👏' };
    if (score >= 100) return { place: 'Qualified', color: 'text-purple-400', message: 'Made it to Final! 🎉' };
    return { place: 'Eliminated', color: 'text-gray-400', message: 'Better luck next year! 💙' };
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl bg-white/10 backdrop-blur-lg border-white/20 text-white">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Badge className="bg-purple-600">{artist.country}</Badge>
            <Badge className="bg-pink-600">{artist.name}</Badge>
            <Badge className="bg-blue-600">"{song.title}"</Badge>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
            Eurovision Song Contest 2024
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {phase === 'intro' && (
            <div className="text-center space-y-4">
              <div className="text-6xl mb-4">🎵</div>
              <h2 className="text-2xl font-bold">Welcome to Eurovision!</h2>
              <p className="text-gray-300">
                Your journey begins with rehearsals, then the semi-final, and hopefully the grand final!
              </p>
              <Button 
                onClick={() => setPhase('rehearsal')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-bold py-3 px-8"
              >
                Start Rehearsals
              </Button>
            </div>
          )}

          {phase === 'rehearsal' && (
            <div className="text-center space-y-4">
              <Music className="w-16 h-16 mx-auto text-blue-400 animate-pulse" />
              <h2 className="text-2xl font-bold">Dress Rehearsal</h2>
              <p className="text-gray-300">Time to perfect your performance before the live shows!</p>
              {isSimulating ? (
                <div className="space-y-4">
                  <div className="text-lg">Rehearsing...</div>
                  <div className="animate-pulse text-yellow-400">🎭 Working on staging and vocals 🎭</div>
                </div>
              ) : (
                <>
                  {rehearsalScore > 0 && (
                    <div className="p-4 bg-white/5 rounded-lg">
                      <div className="text-3xl font-bold text-blue-400">{rehearsalScore} points</div>
                      <div className="text-sm text-gray-300">Rehearsal feedback score</div>
                    </div>
                  )}
                  <Button 
                    onClick={() => simulatePhase('rehearsal', 0.8)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-bold py-3 px-8"
                  >
                    {rehearsalScore > 0 ? 'Continue to Semi-Final' : 'Start Rehearsal'}
                  </Button>
                </>
              )}
            </div>
          )}

          {phase === 'semifinal' && (
            <div className="text-center space-y-4">
              <Star className="w-16 h-16 mx-auto text-yellow-400 animate-pulse" />
              <h2 className="text-2xl font-bold">Semi-Final Performance</h2>
              <p className="text-gray-300">This is it! Perform live and qualify for the Grand Final!</p>
              {isSimulating ? (
                <div className="space-y-4">
                  <div className="text-lg">Performing live...</div>
                  <div className="animate-pulse text-pink-400">🎤 On stage now! 🎤</div>
                </div>
              ) : (
                <>
                  {semiFinalScore > 0 && (
                    <div className="p-4 bg-white/5 rounded-lg">
                      <div className="text-3xl font-bold text-pink-400">{semiFinalScore} points</div>
                      <div className="text-sm text-gray-300">
                        {semiFinalScore >= 100 ? '🎉 Qualified for Grand Final!' : '💔 Eliminated'}
                      </div>
                    </div>
                  )}
                  <Button 
                    onClick={() => simulatePhase('semifinal', 1.0)}
                    className="bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 font-bold py-3 px-8"
                  >
                    {semiFinalScore > 0 ? (semiFinalScore >= 100 ? 'Advance to Final!' : 'View Results') : 'Perform in Semi-Final'}
                  </Button>
                </>
              )}
            </div>
          )}

          {phase === 'final' && (
            <div className="text-center space-y-4">
              <Award className="w-16 h-16 mx-auto text-yellow-400 animate-pulse" />
              <h2 className="text-2xl font-bold">Grand Final!</h2>
              <p className="text-gray-300">The biggest stage in Europe! Give it everything you've got!</p>
              {isSimulating ? (
                <div className="space-y-4">
                  <div className="text-lg">Grand Final performance...</div>
                  <div className="animate-pulse text-yellow-400">👑 Fighting for the crown! 👑</div>
                </div>
              ) : (
                <>
                  {finalScore > 0 && (
                    <div className="p-4 bg-white/5 rounded-lg">
                      <div className="text-4xl font-bold text-yellow-400">{finalScore} points</div>
                      <div className="text-sm text-gray-300">Grand Final performance score</div>
                    </div>
                  )}
                  <Button 
                    onClick={() => simulatePhase('final', 1.2)}
                    className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 font-bold py-3 px-8"
                  >
                    {finalScore > 0 ? 'Begin Voting!' : 'Perform in Grand Final'}
                  </Button>
                </>
              )}
            </div>
          )}

          {phase === 'voting' && (
            <div className="text-center space-y-4">
              <div className="text-6xl mb-4">🗳️</div>
              <h2 className="text-2xl font-bold">Voting in Progress...</h2>
              <p className="text-gray-300">Countries are casting their votes!</p>
              <div className="space-y-2">
                <Progress value={votingProgress} className="w-full" />
                <div className="text-sm text-gray-300">{votingProgress}% votes counted</div>
              </div>
              {finalScore > 0 && (
                <div className="p-4 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-lg">
                  <div className="text-4xl font-bold text-yellow-400 mb-2">{finalScore} points</div>
                  <div className={`text-xl font-semibold ${getPlacement(finalScore).color}`}>
                    {getPlacement(finalScore).place}
                  </div>
                  <div className="text-gray-300">{getPlacement(finalScore).message}</div>
                </div>
              )}
            </div>
          )}

          {/* Progress tracker */}
          <div className="flex justify-center space-x-4 pt-4 border-t border-white/10">
            <Badge variant={phase === 'rehearsal' || rehearsalScore > 0 ? 'default' : 'outline'}>
              Rehearsal {rehearsalScore > 0 && `(${rehearsalScore}pts)`}
            </Badge>
            <Badge variant={phase === 'semifinal' || semiFinalScore > 0 ? 'default' : 'outline'}>
              Semi-Final {semiFinalScore > 0 && `(${semiFinalScore}pts)`}
            </Badge>
            <Badge variant={phase === 'final' || finalScore > 0 ? 'default' : 'outline'}>
              Grand Final {finalScore > 0 && `(${finalScore}pts)`}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Competition;
