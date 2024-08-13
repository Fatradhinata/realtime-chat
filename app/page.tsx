import ChatHeader from '@/components/ChatHeader'
import { Button } from '@/components/ui/button'
import InitUser from '@/lib/store/InitUser';
import { createClient } from "@/lib/supabase/server";
import React from 'react'
import ChatInput from '@/components/ChatInput';
import ListMessages from '@/components/ListMessages';
import ChatMessages from '@/components/ChatMessages';
import ChatAbout from '@/components/ChatAbout';


export default async function Page() {
  const supabase = createClient();
  console.log(supabase)
  const { data } = await supabase.auth.getSession();

  console.log(data.session?.user)

  return (
    <>
      <div className="max-w-3xl mx-auto md:py-10 h-screen">
        <div className='h-full border rounded-md flex flex-col relative'>
          <ChatHeader user={data.session?.user} />
          {data.session?.user ? (
            <>
              <ChatMessages />
              <ChatInput />
            </>
          ) : (
            <ChatAbout />
          )}
        </div>
      </div>
      <InitUser user={data.session?.user} />
    </>
  )
}
