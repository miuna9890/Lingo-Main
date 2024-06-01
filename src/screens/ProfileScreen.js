import { useState, useEffect } from "react"
import { View, Text } from "react-native"
import { Session } from "@supabase/supabase-js"
import { supabase } from "../../lib/supabase"

export default  function ProfileScreen() {
    
const [session, setSession] = useState<Session | null>(null)

useEffect(() => {
  supabase.auth.getSession().then(({ data: { session } }) => {
    setSession(session)
  })

  supabase.auth.onAuthStateChange((_event, session) => {
    setSession(session)
  })
}, [])

return (

    <View>
    <Text> User id: {session?.user?.id}
    
    </Text>
    </View>
);
}