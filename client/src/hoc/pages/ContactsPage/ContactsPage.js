import {useState} from "react";

import Promo from "../../../components/Promo/Promo";
import Text from "../../../components/Text/Text";
import Loader from "../../../components/Loader/Loader";

function ContactsPage() {
  const [isLoading, setIsLoading] = useState(true)

  setTimeout(() => setIsLoading(false), 3000)

  return (
    <Promo>
      {
        isLoading
          ? <Loader />
          : <Text
            text="Вы находитесь на странице контактов интернет-магазина."
          />
      }
    </Promo>
  )
}

export default ContactsPage
