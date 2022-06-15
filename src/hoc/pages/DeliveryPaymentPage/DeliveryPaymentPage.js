import Delivery from "../../../components/Delivery/Delivery";
import Payment from "../../../components/Payment/Payment";
import Promo from "../../../components/Promo/Promo";

function DeliveryPaymentPage() {
  return (
    <Promo>
      <Delivery />
      <Payment />
    </Promo>
  )
}

export default DeliveryPaymentPage
