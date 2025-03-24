import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='flex justify-center mt-14 mb-28'>
        <SignIn />
    </div>
  )
}