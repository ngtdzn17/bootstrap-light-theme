var stripe = Stripe(publishable_key);
var elements = stripe.elements();
var complete = false;

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

card.addEventListener('change', function (event) {
    complete = event.complete;
});

var submitButton = document.getElementById('submit-button');
var form = document.getElementById('payment-form');

submitButton.addEventListener('click', () => {
    event.preventDefault();
    if (complete) {
        let tokenData = {
            name: document.getElementById('fullName').value
        }
        stripe.createToken(card, tokenData).then(function (result) {
            if (result.error) {
                var errorElement = document.getElementById('card-errors');
                errorElement.textContent = result.error.message;
            } else {
                stripeTokenHandler(result.token);
            }
        });
    } else {
        form.submit();
    }
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