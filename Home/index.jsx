import { Mail } from "../../components/mail"
import { accounts, mails } from './data';

export default function MailPage() {

  return (

      <body className="flex-col h-screen w-screen flex md:w-auto">
        <Mail
          accounts={accounts}
          mails={mails}
          navCollapsedSize={4}
        />
      </body>
  )
}
