var stripe = Stripe(publishable_key);
var elements = stripe.elements();

var style = {
    base: {
        color: '#495057',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px'
    },
    invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
    }
};

var card = elements.create('card', {
    style: style
});

card.mount('#card-element');

var form = document.getElementById('payment-form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    stripe.createToken(card, {
        name: document.getElementById('fullName').value
    }).then((result) => {
        if (result.error) {
            var errorElement = document.getElementById('card-errors');
            errorElement.textContent = result.error.message;
        } else {
            stripeTokenHandler(result.token);
        }
    });
});

function stripeTokenHandler(token) {
    var form = document.getElementById('payment-form');
    var hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', 'stripeToken');
    hiddenInput.setAttribute('value', token.id);
    form.appendChild(hiddenInput);
    form.submit();
}