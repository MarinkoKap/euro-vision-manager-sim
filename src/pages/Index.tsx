
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Music, Award, Ticket } from "lucide-react";
import ArtistCreation from '../components/ArtistCreation';
import SongSelection from '../components/SongSelection';
import PerformancePrep from '../components/PerformancePrep';
import Competition from '../components/Competition';
import Results from '../components/Results';

export type Artist = {
  name: string;
  country: string;
  genre: string;
  experience: number;
  charisma: number;
  vocals: number;
};

export type Song = {
  title: string;
  genre: string;
  tempo: string;
  language: string;
  catchiness: number;
  originality: number;
};

export type Performance = {
  staging: string;
  costume: string;
  choreography: string;
  effects: string;
};

type GamePhase = 'menu' | 'artist' | 'song' | 'performance' | 'competition' | 'results';

const Index = () => {
  const [gamePhase, setGamePhase] = useState<GamePhase>('menu');
  const [artist, setArtist] = useState<Artist | null>(null);
  const [song, setSong] = useState<Song | null>(null);
  const [performance, setPerformance] = useState<Performance | null>(null);
  const [finalScore, setFinalScore] = useState<number>(0);

  const startGame = () => {
    setGamePhase('artist');
    setArtist(null);
    setSong(null);
    setPerformance(null);
    setFinalScore(0);
  };

  const handleArtistCreated = (newArtist: Artist) => {
    setArtist(newArtist);
    setGamePhase('song');
  };

  const handleSongSelected = (newSong: Song) => {
    setSong(newSong);
    setGamePhase('performance');
  };

  const handlePerformancePrepared = (newPerformance: Performance) => {
    setPerformance(newPerformance);
    setGamePhase('competition');
  };

  const handleCompetitionComplete = (score: number) => {
    setFinalScore(score);
    setGamePhase('results');
  };

  const backToMenu = () => {
    setGamePhase('menu');
  };

  if (gamePhase === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-20 w-1 h-1 bg-white rounded-full animate-pulse delay-100"></div>
          <div className="absolute bottom-20 left-20 w-1 h-1 bg-white rounded-full animate-pulse delay-200"></div>
          <div className="absolute bottom-10 right-10 w-2 h-2 bg-white rounded-full animate-pulse delay-300"></div>
        </div>
        
        <Card className="w-full max-w-2xl bg-white/10 backdrop-blur-lg border-white/20 text-white">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <Star className="w-8 h-8 text-yellow-400 animate-pulse" />
              <Music className="w-8 h-8 text-pink-400 animate-pulse" />
              <Award className="w-8 h-8 text-blue-400 animate-pulse" />
            </div>
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Eurovision Manager
            </CardTitle>
            <CardDescription className="text-xl text-gray-200">
              Guide your artist to Eurovision glory! Make strategic decisions, create the perfect performance, and compete for the ultimate prize.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
                <Ticket className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <h3 className="font-semibold mb-1">Create Your Artist</h3>
                <p className="text-sm text-gray-300">Choose your country and build your performer</p>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
                <Music className="w-8 h-8 mx-auto mb-2 text-pink-400" />
                <h3 className="font-semibold mb-1">Perfect Your Song</h3>
                <p className="text-sm text-gray-300">Select genre, tempo, and style</p>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
                <Award className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                <h3 className="font-semibold mb-1">Win Eurovision</h3>
                <p className="text-sm text-gray-300">Compete in semi-finals and grand final</p>
              </div>
            </div>
            
            <Button 
              onClick={startGame}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 text-lg transition-all duration-300 transform hover:scale-105"
            >
              Start Your Eurovision Journey
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {gamePhase === 'artist' && (
        <ArtistCreation onArtistCreated={handleArtistCreated} />
      )}
      {gamePhase === 'song' && artist && (
        <SongSelection artist={artist} onSongSelected={handleSongSelected} />
      )}
      {gamePhase === 'performance' && artist && song && (
        <PerformancePrep 
          artist={artist} 
          song={song} 
          onPerformancePrepared={handlePerformancePrepared} 
        />
      )}
      {gamePhase === 'competition' && artist && song && performance && (
        <Competition 
          artist={artist} 
          song={song} 
          performance={performance} 
          onComplete={handleCompetitionComplete}
        />
      )}
      {gamePhase === 'results' && artist && (
        <Results 
          artist={artist}
          song={song}
          performance={performance}
          finalScore={finalScore}
          onBackToMenu={backToMenu}
        />
      )}
    </div>
  );
};

export default Index;
