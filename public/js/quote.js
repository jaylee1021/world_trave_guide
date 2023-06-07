function changeQuote(s1) {
    let quoteArray = ['"I haven\'t been everywhere but it\'s on my list',
        '"Live Your Life By A Compass, Not A Clock." - ERICA JONG',
        '"Take Only Memories, Leave Only Footprints." - CHIEF SEATTLE',
        '"There Is A World Elsewhere." - SHAKESPEARE',
        '"A Journey Of A Thousand Miles Begins With A Single Step." - LAO TZU',
        '"Life Begins At The End Of your Comfort Zone." - NEALE DONALD WALSCH',
        '"WE TRAVEL NOT TO ESCAPE LIFE, BUT FOR LIFE NOT TO ESCAPE US." - ANONYMOUS"',
        '"THE WORLD IS A BOOK AND THOSE WHO DO NOT TRAVEL READ ONLY ONE PAGE." - ST. AUGUSTINE',
        '"THERE ARE NO FOREIGN LANDS. IT IS THE TRAVELER ONLY WHO IS FOREIGN." - ROBERT LOUIS STEVENSON',
        '"THERE WAS NOWHERE TO GO BUT EVERYWHERE, SO JUST KEEP ON ROLLING UNDER THE STARS." - JACK KEROUAC',
        '"TRAVEL MAKES ONE MODEST, YOU SEE WHAT A TINY PLACE YOU OCCUPY IN THE WORLD." - GUSTAVE FLAUBERT'];
    let random_quote = quoteArray[Math.floor(Math.random() * quoteArray.length)];
    console.log(random_quote);
    let quoteLine = document.getElementById(s1);
    quoteLine.innerHTML = '';

    quoteLine.innerHTML = random_quote;



}