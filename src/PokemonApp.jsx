// Importação dos componentes necessários
import { SearchInput } from "./components/SearchInput";
import { PokemonsList } from "./components/PokemonsList";
import { useState } from "react";

// Componente principal da aplicação
export const PokemonApp = () => {
    // Estado para armazenar o termo de busca
    const [searchTerm, setSearchTerm] = useState("");

    // Função que é chamada quando o usuário digita no campo de busca
    const handleSearch = (term) => {
        setSearchTerm(term);
    }

    // Renderização do componente
    return (
        // Container principal com padding para espaçamento
        <div style={{ padding: '20px' }}>
            {/* Título da aplicação centralizado */}
            <h1 style={{ 
                textAlign: 'center', 
                marginBottom: '20px',
                color: '#333'
            }}>PokeDex</h1>

            {/* Container do campo de busca centralizado */}
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center',
                marginBottom: '20px'
            }}>
                {/* Componente de busca que recebe a função de callback */}
                <SearchInput onSearch={handleSearch} />
            </div>

            {/* Lista de pokémons que recebe o termo de busca como prop */}
            <PokemonsList searchTerm={searchTerm} />
        </div>
    )
}