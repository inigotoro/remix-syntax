import { useLoaderData, json, redirect, useOutletContext } from "remix";
import type { LoaderFunction } from "remix";
import styles from '~/styles/syntax/show.css';
import { padNumber } from '~/utils/pad';

export interface Show {
  number: number;
  title: string;
  html: string;
  url: string;
}

export function meta() {
  return {
    title: 'The Syntax Podcast',
    'og:title': 'The Syntax Podcast',
  };
}

export const handle = {
  // Object you can put anything in.
}

export function headers() {
  // return http headers
  // Most common use us caching or authentication
}

// Set <links> tags for this page
export const links = () => {
  return [
    {
      rel: 'stylesheet',
      href: styles
    }
  ]
};

// Action
// Handle data mutations or other actions.
// same API as a loader, called when a post, put, patch, delete request is made
export function action() {
  // Most common use is for forms.

}

// Server only loader function
export const loader: LoaderFunction = async ({ params }) => {
  let {show: showNumber = '001'} = params;
  if (showNumber.length < 3) {
    showNumber = padNumber(showNumber);
    return redirect(`/syntax/${showNumber}`, 301);
  }

  const response = await fetch(`https://syntax.fm/api/shows/${showNumber}`);
  const show = await response.json();

  if(!show?.url) {
    throw json('Not found', { status: 404 });
  }

  return show;
};

export default function () {
  const show = useLoaderData<Show>();
  const { podcastName }: {podcastName: string} = useOutletContext();
  return (
    <section className="show-details">
      <h3>{podcastName}</h3>
      <h1>#{show.number}: {show.title}</h1>
      <audio controls src={show.url}></audio>
      <div dangerouslySetInnerHTML={{ __html: show.html }} />
    </section>
  )
}
