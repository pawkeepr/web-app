# Tests Units

- @testing-library/react
- vitest
- @testing-library/jest-dom

**_Importância_**: alta

````javascript
   / ❌
   expect(screen.queryByRole('alert')).toBeInTheDocument()
    
   // ✅
   expect(screen.getByRole('alert')).toBeInTheDocument()
   expect(screen.queryByRole('alert')).not.toBeInTheDocument()
````

> A única razão pela qual a variante da consulta query* é exposta é
> para você ter uma função que você pode chamar, que não gere um erro
> se nenhum elemento for encontrado para corresponder à consulta (ela
> retornará null se nenhum elemento for encontrado). A única razão pela
> qual isso é útil é verificar se um elemento não é renderizado na
> página.



<div align="center" color="red">

**_Dica: só use query_ variantes para fazer asserções de quando um elemento não deve ser encontrado.**
   
**Aviso: get_variantes lançam um erro, impedindo o teste, para verificar ausência de elementos sempre use query_ variantes.**
   
</div>

## Links

- [Errors Comuns com o React Testing Library](https://willianjusten.com.br/erros-comuns-com-o-react-testing-library)
