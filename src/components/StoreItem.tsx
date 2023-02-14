import { Button, Card } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { formatCurrency } from "../utilities/formatCurrency"

type StoreItemProps = {
  id: number
  name: string
  price: number
  imgUrl: string
}

// Implementations to store items taken from ShoppingCartContext.tsx
export function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart()
  const quantity = getItemQuantity(id)

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={imgUrl}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-4">{name}</span>
          <span className="ms-3">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            
            // If quantity in cart is 0, show "Add To Cart button"
            <Button className="w-100" onClick={() => increaseCartQuantity(id)}>
              + Add To Cart
            </Button>

            // Otherwise show + or - buttons to increase/decrease quantity
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: "1rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: "1rem" }}
              >
                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                <div>
                  <span className="fs-3">{quantity}</span> in cart
                </div>
                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
              </div>
              <Button
                onClick={() => removeFromCart(id)}
                variant="danger"
                size="sm"
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  )
}