import { Head } from '$fresh/runtime.ts';
import { HandlerContext, PageProps } from '$fresh/server.ts';
import {
  getUserBySession,
  listGamesByPlayer,
  listRecentlySignedInUsers,
} from '$utils/db.ts';
import { Game, State, User } from '$utils/types.ts';
import Counter from '../islands/Counter.tsx';

type Data = SignedInData | null;

interface SignedInData {
  user: User;
  users: User[];
  games: Game[];
}

export async function handler(req: Request, ctx: HandlerContext<Data, State>) {
  const url = new URL(req.url);
  url.pathname = '/auth/signin';

  if (!ctx.state.session) return Response.redirect(url);

  const [user, users] = await Promise.all([
    getUserBySession(ctx.state.session),
    listRecentlySignedInUsers(),
  ]);
  if (!user) return Response.redirect(url);

  const games = await listGamesByPlayer(user.id);

  return ctx.render({ user, users, games });
}

export default function Home({ data }: PageProps<Data>) {
  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        {data?.user.name}
        <img
          src="/logo.svg"
          class="w-32 h-32"
          alt="the fresh logo: a sliced lemon dripping with juice"
        />
        <p class="my-6">
          Welcome to `fresh`. Try updating this message in the
          ./routes/index.tsx file, and refresh.
        </p>
        <Counter start={3} />
      </div>
    </>
  );
}
