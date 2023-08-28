import './App.css';
import { TwitterFollowCard } from './TwitterFollowCard';
import { useState } from "react";

export function App () {
  //const formatUsername = (username: string) => `@${username}`;

  //const formattedUsername = <span>@ale</span>;

  const [name, setName] = useState('ale');

  const changeName = () => {
    setName('Pepe')
  }

  return (
    <section className='App'>{/* Is same to put <React.Fragment> */}
      <TwitterFollowCard username="grenheir" isFollowing>
        Grenhier pelo verde
      </TwitterFollowCard>
      <TwitterFollowCard username={name} isFollowing={false}>
        {name}
      </TwitterFollowCard>

      <button onClick={changeName}>Cambio nombre</button>
    </section>
  )
}