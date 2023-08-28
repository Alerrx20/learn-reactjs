import { useState } from "react";

export function TwitterFollowCard ({ children, username }: { children: any, username: any, isFollowing: boolean }) {
  const [isFollowing, setIsFollowing] = useState(false);
  
  const text = isFollowing ? 'Siguiendo' : 'Seguir';
  const buttonClassName = isFollowing ? 'tw-followCard-button is-following' : 'tw-followCard-button';

  const handleClick = () => {
    setIsFollowing(!isFollowing)
  }

  return (
    <article className="tw-followCard">
      <header className="tw-followCard-header">
        <img className="tw-followCard-avatar" 
        src={`https://unavatar.io/${username}`} alt="Avatar random" />
        <div className="tw-followCard-info">
          <strong>{ children }</strong>
          <span className="tw-followCard-infoUserName">@{ username }</span>
        </div>
      </header>

      <aside>
        <button className={buttonClassName} onClick={handleClick}>{text}</button>
      </aside>
    </article>
  )
}