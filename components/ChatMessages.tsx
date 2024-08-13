import React, { Suspense } from 'react'
import { createClient } from "@/lib/supabase/server";
import ListMessages from './ListMessages'
import InitMessages from '@/lib/store/InitMessages';
import { LIMIT_MESSAGE } from '@/lib/constant';

export default async function ChatMessages() {
  const supabase = createClient();

  const { data } = await supabase.from("messages").select("*, users(*)").range(0, LIMIT_MESSAGE).order("created_at", { ascending: false});

  console.log(data)

  return (
    <Suspense fallback={"loading.."}>
      <ListMessages />
      <InitMessages messages={data?.reverse() || []} />
    </Suspense>
  )
}
function supabaseServer() {
  throw new Error('Function not implemented.');
}

