<template>
    <div class="container">
      <app-header :quoteCount="quotes.length" :maxQuotes="maxQuotes"></app-header>
      <app-new-quote @quoteAdded="newQuote"></app-new-quote>
      <app-quote-grid :quotes="quotes" @quoteDeleted="deleteQuote"></app-quote-grid>
      <div class="row">
        <div class="col-sm-12 text-center">
          <div class="alert alert-info">
            Click to Delete
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import QuoteGrid from './components/QuoteGrid'
  import NewQuote from './components/NewQuote'
  import Header from './components/Header'

  export default {
      data() {
        return {
          quotes: [
            'I need Rainbow six major in Raleigh tickets pls 💀☠🕵️‍♀️'
          ],
          maxQuotes:10
        }
      },
      methods: {
        newQuote(quote) {
          if (this.quotes.length == this.maxQuotes)
            return alert('Please delete Quotes')
          if (quote != '')
            this.quotes.push(quote)
        },
        deleteQuote(index) {
          this.quotes.splice(index, 1)
        },
      },
      components:{
        appQuoteGrid: QuoteGrid,
        appNewQuote: NewQuote,
        appHeader: Header,
      }
  }
</script>

<style>
</style>