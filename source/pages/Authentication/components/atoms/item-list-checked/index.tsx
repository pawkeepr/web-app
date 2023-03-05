import classnames from 'classnames'

type ItemListCheckedProps = {
  condition: boolean
  name: string
  text: string
}

const ItemListChecked = ({ condition, name, text }: ItemListCheckedProps) => {
  return (
    <>
      <li
        data-testid={name}
        id={name}
        className={
          classnames({
            'list-group-item fs-10 border-0': true,
            'text-success': condition,
            'text-danger': !condition
          })
        }
      >
        <i
          className={
            classnames({
              'align-middle me-1': true,
              'ri-check-line': condition,
              'ri-close-line': !condition
            })
          } />
        {text}
      </li>
    </>
  )
}

export default ItemListChecked