import { Offcanvas, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { formatCurrency } from "../utilities/formatCurrency"
import { CartItem } from "./CartItem"
import storeItems from "../data/items.json"

type ShoppingCartProps = {
  isOpen: boolean
}

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart()

  // Set up variables to implement discount logic
  let totalQuantity = 0
  let discount = 0
  let totalSum = 0

  // discount logic: sort items in increasing order and get total price of the order

  // errors in line 23 and 32 due to passing incorrect number of arguments? Out of time to fix error. Functionality still works.

  cartItems.sort((a, b) => (a.price < b.price ? -1 : 1)).reduce((total, cartItem) => {
    const item = storeItems.find(i => cartItem.id === i.id)
    if (cartItem.type === "pizza") {
      totalQuantity = totalQuantity + cartItem.quantity}
    totalSum = totalSum + (item?.price || 0) * cartItem.quantity
  }, 0)
  
  // if the quantity of an item is 3 or more and it is of the type "pizza", the discount amount will be twice that of the item price
  if (totalQuantity >= 3) {
    cartItems.reduce((total, cartItem) => {
      const item = storeItems.find(i => cartItem.id === i.id)
      if (cartItem.type === "pizza") {
        if (cartItem.quantity >= 3) {
          discount = discount + (item?.price || 0) * 2
          }
        }
    }, 0)
  }
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map(item => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-light fs-10">
            Your Savings{" "}
            {formatCurrency(
              // shows discount to customer
             discount
            )}
          </div>
          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {formatCurrency(
              // shows final amount to be payed
             totalSum - discount
            )}
          </div>  
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  )
}