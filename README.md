# JSAJX

> Generalnie przykłady korzystają z [j4b1-assert](./src/j4b1-assert.js) do sprawdzenia poprawności zadań typu **Warm Up** oraz **Challenge**

aby zobaczyć wynik działania np. następującego testu:

```javascript
assertThat(
    'Should give me number 40 when 40 and 10 given',
    expect => expect( giveMeLargestNumber(40, 10) ).toBe(40)
) //=
```

należy nia jego końcu posiadać znak: `//=` lub `//?`  
```javascript
//= - dla JS Repl
//? - dla Quokka.js
```

warto mieć włączoną opcję w menu głównym:
> File > ✔ Auto Save

### _VSC_ - JavaScript REPL (Domyślnie):
> 1. Należy doinstalować rozszerzenie:
> [JavaScript REPL](https://marketplace.visualstudio.com/items?itemName=achil.vscode-javascript-repl)
> 2. Upewnić się, że na końcu `assertThat(....) //=` jest komentarz w postaci `//=` ! 

- Otwieramy dowolny plik `.js`. Po kliknięciu prawy przyciskiem powinniśmy mieć dostęp do polecenia:  
> JS Repl: Run  

- Jeśli nie, klikamy `F1` i wpisujemy polecenie **>** `JS Repl: Run`

---  

### _VSC_ - Quokka.js (Opcjonalne):
> 1. Należy doinstalować rozszerzenie:
> [Quokka.js](https://marketplace.visualstudio.com/items?itemName=WallabyJs.quokka-vscode)
> 2. Upewnić się, że na końcu `assertThat(....) //?` jest komentarz w postaci `//?` !
> 3. Domyślnie — nie ma, warto jest zmienić za pomocą opcji _Search_ `Ctrl + Shift + F` i _Replace_
> 4. Wtedy robimy _Replace All_ z `//=` na `//?`
> 
- Klikamy `F1` i wpisujemy polecenie **>** `Quokka.js: Run on save for Current File`
             
---

### _JetBrains (WebStrom / IntelliJ)_ - Quokka.js (Opcjonalnie):
> 1. Należy doinstalować rozszerzenie: [Quokka](https://plugins.jetbrains.com/plugin/9667-quokka)
> 2. Upewnić się, że na końcu `assertThat(....) //?` jest komentarz w postaci `//?` !
> 3. Domyślnie — nie ma, warto jest zmienić za pomocą opcji _Replace in files_ `Ctrl + Shift + R`
> 4. Wtedy robimy _Replace All_ z `//=` na `//?`

- Otwieramy dowolny plik `.js`. Po kliknięciu prawy przyciskiem powinniśmy mieć dostęp do polecenia:
> Start Quokka (Run Automatically) 
