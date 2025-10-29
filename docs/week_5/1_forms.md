# Forms

## Hva er et form?

Et [form](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms) samler data fra brukeren og sender dem videre til en mottaker via en HTTP-metode (GET eller POST). Vi kan inni form elementet bruke visse HTML tags til å produsere formData som vi kan jobbe med, vi har for eksempel:

- `<input>` lar deg skrive inn tekst og tall, men brukes til mange [andre verdier](https://www.w3schools.com/html/html_form_input_types.asp) også
- `<select>` lar deg bruke nettleseren sin innebygde dropdown til å vise flere valg
- `<textarea>` er en større versjon av `<input type="text">` feltet til lengre tekst inputs
- `<button>` lar deg kjøre forskjellige handlinger i forms, f.eks: sende inn eller tømme felter.

```html
<!-- Eksempel på søkefelt som bruker forms til å sende data til server -->
<form action="/search" method="get">
  <label for="q">Søk</label>
  <input id="q" name="q" type="search" />
  <button type="submit">Søk</button>
</form>
```

Vi kan bruke HTML attributes i form til å konfigurere hva som skal skje når en bruker submitter

- `actions="/search"` definerer hvor vi ønsker at data'en skal bli sendt, hvis du ikke bruker dette feltet vill samme adressen som du besøker bli brukt
- `method="get"` er hvilke
  Vi må også ligge til `name` for alle input feltene vi ønsker å bruke slik at de har en "nøkkel" verdi vi kan hente ut.
- `name="q"` vill bli lagret i form objektet som `name: "q"` som vi senere kan hente ut med `form.get('q')`

## Viktige deler av forms

### Felter

En fundemental del av forms er å skrive inn data som vi kan gjøre ved å ligge til elementer som er støttet, vi skal nå se på noen av de mest brukte med eksempler

#### [Label](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/label)

Label brukes til å gi et navn til et felt som brukerene kan lett se, hvis du bruker `id` på input elementet kan du knytte label til dette elementet ved å bruke `for`.
Det er anbefalt at du bruker label for alle felter som brukere kan endre på i forms, spesielt hvis du ønsker å ha god støtte for [accessibility](https://www.w3schools.com/html/html_accessibility.asp)

```html
<!-- Du kan ha label før eller etter input -->
<label for="userEmail">Hva er din epost?</label>
<input name="email" id="userEmail" />

<!-- Du kan også plassere input inni label, da trenger du ikke `id` og `for` og allikevell få samme funksjonalitet -->
<label>
  <span>Hva er din epost?</span>
  <input type="text" name="email" />
</label>
```

#### [Input](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input)

Input feltet er kanskje det mest fleksible elementet du kan bruke inni forms, du har flere tilgjengelige valg av [typer](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#input_types) via `type="..."` i tillegg til mange [attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#attributes). Hvis du glemmer å ligge til `type` så defaulter den til tekst

```html
<!-- Vanlig tekst felt for et brukernavn -->
<input type="text" name="username" />

<!-- Du kan skifte om type til number for tall -->
<input type="number" name="age" />

<!-- Du kan lage checkboxes eller radio knapper etter behov -->
<input type="checkbox" name="hasConcent" />
<input type="radio" name="hasConcent" />

<!-- Og mange flere! -->
```

#### [Textarea](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/textarea)

Dette felter gir deg et større tekst element å jobbe med hvis du f.eks trenger flere linjer med tekst

```html
<label for="story">Tell us your story:</label>
<textarea id="story" name="story" rows="5" cols="33">
It was a dark and stormy night...
</textarea>
```

#### [Select](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/select) & [Options](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/option)

Select og Options lar deg produsere en dropdown meny som fungerer i alle moderne browsers. Her bruker du `value` til å hente ut verdien av valget til brukeren, da har du muligheten til å holde value / label adskilt for UI

```html
<label for="pet-select">Choose a pet:</label>
<select name="pets" id="pet-select">
  <option value="">--Please choose an option--</option>
  <option value="dog">Dog</option>
  <option value="cat">Cat</option>
  <option value="hamster">Hamster</option>
  <option value="parrot">Parrot</option>
  <option value="spider">Spider</option>
  <option value="goldfish">Goldfish</option>
</select>
```

### [Knapper](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button)

Vi bruker knapper (buttons) til å utføre handlinger i form elementet vårt ut i fra hvilke [type](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button#type) den har

- `type=submit` brukes for å sende inn form data som spesifisert i `form`
- `type=reset` brukes for å tømme feltene i form, f.eks bruker ønsker å starte på nytt i et skjema
- `type=button` hvis bruker denne typen gjør ikke lengre knappen noe spesielt med formet og du kan da knytte nye funksjoner via `onClick` f.eks

```html
<form method="post">
  ...
  <button type="submit">Send inn skjema</button>
  <button type="reset">Tilbakestill skjema</button>
  <button type="button" onClick="printFormData">printer ut skjema i log</button>
</form>
```

### [Methods](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/form#method)

Når vi skal sende inn form data så har vi noen valg når det kommer til hvilke metode vi ønsker å bruke, dette valget er avhengig av hvordan du ønsker serveren eller tjenesten skal respondere på forespørselen, men hovedsakelig bruker vi enten POST eller Get. Hovedforskjellen her er hvordan data blir sendt over HTTP

- [GET](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/GET)
  Denne metoden ligger alle feltene i form til i URL feltet og sender det til serveren og forventer en respons tilbake som vi kan behandle. Dette er en praktisk løsning til f.eks søkefelter siden du kan ta vare på url og bruke det flere ganger. Du kan også bruke det til filtreering eller henting av data.

```html
<!-- url: /contact?my-name=kristoffer -->
<form method="get">
  <input name="my-name" />
  ...
</form>
```

- [POST](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/POST)
  Når du ønsker å sende mer komplisert data eller du har sensitivt innhold så er POST metoden bedre siden den ikke ligger forespørselen til i URL, istedet så bruker den HTTP [requests](https://developer.mozilla.org/en-US/docs/Web/API/Request) klassen

```html
<!-- url: /contact -->
<form method="post">
  <input name="my-name" />
  ...
</form>
```

### [Actions](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/form#action)

Action attributen brukes for å definere URL til hvor du ønsker at form data skal bli sendt når du sender det inn. Hvis vi ikke definerer noe `action` endepunkt så vill nettleseren sende det til samme url som du sendte form fra.
Hvis vi skifter actions så kan du bestemme hvor data blir sendt

```html
<!-- Hvis vi er inne på "/contact" siden og ser på form, men action peker til et annet sted -->
<!-- Så vill data bli sendt til f.eks: http://localhost:3000/some/other/page -->
<form method="post" action="/some/other/page">...</form>
```

### [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData)
Når vi sender inn form så tar nettleseren over og genererer et `formData` objekt som inneholder verdiene av alle elementene vi har lagt til inni `<form>`, disse vill bli lagret som [key / value pairs](https://www.w3schools.com/js/js_objects.asp). `formData` er hoved metoden vi kan behandle form data senere når vi mottar forespørselen fra brukeren. Vi skal se mer på det i [neste emne](2_form_submission.md)

<table width="100%">
  <tr>
    <td><a href="README.md">← Tilbake</a></td>
    <td align="right"><a href="2_form_submission.md">Form Submission →</a></td>
  </tr>
</table>
````
