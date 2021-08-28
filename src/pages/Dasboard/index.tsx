import React, {useState, useEffect, FormEvent} from 'react';
import { FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import icone from '../../assets/git_icone.png'
import api from '../../services/api'
import { Repository } from '../Repository';

import { Title, Form, Repositories, Error } from './styles';

interface Repository{
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export const Dashboard: React.FC  = () => {

  const [newRepo, setNewRep] = useState('');
  const [inputError, setInputError] = useState('');
  const [repositories, setRepositories] = useState<Array<Repository>>(() => {
    const storageRepositories = localStorage.getItem('@GithubExplorer:repositories');

    if(storageRepositories){
      return JSON.parse(storageRepositories);
    }else{
      return [];
    }
  });

  // nome pra não conflirtar com outros aplicações que estão no local hostname,
  // pq localstore é por endereço, s evarias outras com endereço 3000, coloca o nome pra não 
  // ser compartilhada ou atrapalhar
  useEffect(() => {
    localStorage.setItem('@GithubExplorer:repositories',JSON.stringify(repositories));
  },[repositories]);



  async function handleAddRepository(event : FormEvent<HTMLFormElement>){
    event.preventDefault(); //prevenir o comportamento default dentro do html
    if(!newRepo){
      setInputError('Digite o autor/nome do repositório');
      return;
    }

    try{
      
      const response = await api.get<Repository>(`repos/${newRepo}`);
      
      const repository = response.data;
      
      setRepositories([...repositories, repository]);
      setNewRep("");
      setInputError('');
    }catch(err){
      setInputError('Erro ao buscar por esse repositório');
    }

  }

  return (
    <>
      <img src={icone} alt="Github Explore" />
      <Title>Explore repositorios no gitgub</Title>

      {/* 
      truthy - 'asds',3 {teste: 1} 
      falsy - é um vazio 
      !! o primeiro converte pra true e depois pra false
      */}
      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input 
          value={newRepo}
          placeholder="Digite o nome do repositório"
          onChange={e => setNewRep(e.target.value)}
          />
        <button type="submit">Pesquisar</button>
      </Form>

      { inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map(repository => (
          <Link key={repository.full_name} to={`/repository/${repository.full_name}`}>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login} />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20}/>
          </Link>
        ))}
      </Repositories>
      
    </>
  )
}