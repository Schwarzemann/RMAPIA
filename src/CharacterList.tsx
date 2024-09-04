import React, { useEffect, useState } from 'react';
import { getCharacters } from './services/api';
import './CharacterList.css';

interface Character {
    id: number;
    name: string;
    status: string;
    gender: string;
    image: string;
}

const CharacterList: React.FC = () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [statusFilter, setStatusFilter] = useState<string>('');
    const [genderFilter, setGenderFilter] = useState<string>('');

    useEffect(() => {
        const fetchCharacters = async () => {
            const data = await getCharacters(statusFilter, genderFilter);
            setCharacters(data.results);
        };
        fetchCharacters();
    }, [statusFilter, genderFilter]);

    return (
        <div>
            <h1>Rick and Morty Characters</h1>
            <div className="filters">
                <label>Status: </label>
                <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
                    <option value="">All</option>
                    <option value="alive">Alive</option>
                    <option value="dead">Dead</option>
                    <option value="unknown">Unknown</option>
                </select>
                <label> Gender: </label>
                <select onChange={(e) => setGenderFilter(e.target.value)} value={genderFilter}>
                    <option value="">All</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="genderless">Genderless</option>
                    <option value="unknown">Unknown</option>
                </select>
            </div>
            <div className="character-list">
                {characters.map(character => (
                    <div key={character.id} className="character-card">
                        <img src={character.image} alt={character.name} />
                        <h2>{character.name}</h2>
                        <p>{character.status} - {character.gender}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CharacterList;
