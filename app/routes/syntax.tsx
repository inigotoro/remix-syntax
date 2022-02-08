import { Link, Outlet, useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import styles from '~/styles/syntax.css';
import type { Show } from './syntax/$show';
import { padNumber } from "~/utils/pad";

export const links = () => {
  return [
    {
      rel: 'stylesheet',
      href: styles
    }
  ]
};

export const loader: LoaderFunction = async () => {
  const response = await fetch('https://syntax.fm/api/shows');
  const shows: Show[] = await response.json();
  return {
    podcastName: "The Syntax Podcast",
    shows
  }
};

export default function () {
  const {podcastName, shows} = useLoaderData<{ podcastName: string, shows: Show[] }>();
  return (
    <div>
      <section>
        <h1>{podcastName}</h1>
      </section>
      <section className="cols">
        <aside className="playlist">
          <nav>
            <ul>
              {shows.map((show) => (
                <li key={show.number}>
                  <Link to={`/syntax/${padNumber(show.number?.toString())}`}>
                    #{show.number} - {show.title}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <Outlet context={{ podcastName }} />
      </section>
    </div>
  );
}
