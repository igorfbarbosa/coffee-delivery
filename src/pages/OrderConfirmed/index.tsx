import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from 'styled-components'
import { Clock, CurrencyDollar, MapPin } from 'phosphor-react'
import { RegularText, TitleText } from '../../components/Typography'
import { OrderConfirmedContainer, OrderDetailsContainer } from './styles'
import confirmedOrderIllustration from '../../assets/confirmed-order.svg'
import { InfoWithIcon } from '../../components/InfoWithIcon'
import { OrderData } from '../CompleteOrder'
import { paymentMethods } from '../CompleteOrder/components/CompleteOrderForm/PaymentMethodOptions'

interface LocationType {
  state: OrderData
}

export function OrderConfirmedPage() {
  const { colors } = useTheme()

  const { state } = useLocation() as unknown as LocationType

  const navigate = useNavigate()

  useEffect(() => {
    if (!state) {
      navigate('/')
    }
  }, [])

  if (!state) return <></>

  return (
    <OrderConfirmedContainer className="container">
      <div>
        <TitleText>Uhu! Pedido confirmado</TitleText>
        <RegularText>
          Agora é só aguardar que logo o café chegará até voce
        </RegularText>
      </div>

      <section>
        <OrderDetailsContainer>
          <InfoWithIcon
            icon={<MapPin weight="fill" />}
            iconBg={colors['brand-purple']}
            text={
              <RegularText>
                Entrega em{' '}
                <strong>
                  {state.street}, {state.number}
                </strong>
                <br />
                {state.district} - {state.city}, {state.uf}
              </RegularText>
            }
          />
          <InfoWithIcon
            icon={<Clock weight="fill" />}
            iconBg={colors['brand-yellow']}
            text={
              <RegularText>
                Previsão de entrega
                <br />
                <strong>20 min - 30 min</strong>
              </RegularText>
            }
          />
          <InfoWithIcon
            icon={<CurrencyDollar weight="fill" />}
            iconBg={colors['brand-yellow']}
            text={
              <RegularText>
                Pagamento na entrega
                <br />
                <strong>{paymentMethods[state.paymentMethod].label}</strong>
              </RegularText>
            }
          />
        </OrderDetailsContainer>

        <img src={confirmedOrderIllustration} alt="" />
      </section>
    </OrderConfirmedContainer>
  )
}
