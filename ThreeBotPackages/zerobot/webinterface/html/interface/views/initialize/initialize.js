/* eslint no-undef: 0 */
/* eslint-disable no-new */
module.exports = {
  data: () => ({
    countries: [
      'Afghanistan',
      'Albania',
      'Algeria',
      'Andorra',
      'Angola',
      'Antigua and Barbuda',
      'Argentina',
      'Armenia',
      'Australia',
      'Austria',
      'Azerbaijan',
      'The Bahamas',
      'Bahrain',
      'Bangladesh',
      'Barbados',
      'Belarus',
      'Belgium',
      'Belize',
      'Benin',
      'Bhutan',
      'Bolivia',
      'Bosnia and Herzegovina',
      'Botswana',
      'Brazil',
      'Brunei',
      'Bulgaria',
      'Burkina Faso',
      'Burundi',
      'Cabo Verde',
      'Cambodia',
      'Cameroon',
      'Canada',
      'Central African Republic',
      'Chad',
      'Chile',
      'China',
      'Colombia',
      'Comoros',
      'Congo, Democratic Republic of the',
      'Congo, Republic of the',
      'Costa Rica',
      'Côte d’Ivoire',
      'Croatia',
      'Cuba',
      'Cyprus',
      'Czech Republic',
      'Denmark',
      'Djibouti',
      'Dominica',
      'Dominican Republic',
      'East Timor (Timor-Leste)',
      'Ecuador',
      'Egypt',
      'El Salvador',
      'Equatorial Guinea',
      'Eritrea',
      'Estonia',
      'Eswatini',
      'Ethiopia',
      'Fiji',
      'Finland',
      'France',
      'Gabon',
      'The Gambia',
      'Georgia',
      'Germany',
      'Ghana',
      'Greece',
      'Grenada',
      'Guatemala',
      'Guinea',
      'Guinea-Bissau',
      'Guyana',
      'Haiti',
      'Honduras',
      'Hungary',
      'Iceland',
      'India',
      'Indonesia',
      'Iran',
      'Iraq',
      'Ireland',
      'Israel',
      'Italy',
      'Jamaica',
      'Japan',
      'Jordan',
      'Kazakhstan',
      'Kenya',
      'Kiribati',
      'Korea, North',
      'Korea, South',
      'Kosovo',
      'Kuwait',
      'Kyrgyzstan',
      'Laos',
      'Latvia',
      'Lebanon',
      'Lesotho',
      'Liberia',
      'Libya',
      'Liechtenstein',
      'Lithuania',
      'Luxembourg',
      'Madagascar',
      'Malawi',
      'Malaysia',
      'Maldives',
      'Mali',
      'Malta',
      'Marshall Islands',
      'Mauritania',
      'Mauritius',
      'Mexico',
      'Micronesia, Federated States of',
      'Moldova',
      'Monaco',
      'Mongolia',
      'Montenegro',
      'Morocco',
      'Mozambique',
      'Myanmar (Burma)',
      'Namibia',
      'Nauru',
      'Nepal',
      'Netherlands',
      'New Zealand',
      'Nicaragua',
      'Niger',
      'Nigeria',
      'North Macedonia',
      'Norway',
      'Oman',
      'Pakistan',
      'Palau',
      'Panama',
      'Papua New Guinea',
      'Paraguay',
      'Peru',
      'Philippines',
      'Poland',
      'Portugal',
      'Qatar',
      'Romania',
      'Russia',
      'Rwanda',
      'Saint Kitts and Nevis',
      'Saint Lucia',
      'Saint Vincent and the Grenadines',
      'Samoa',
      'San Marino',
      'Sao Tome and Principe',
      'Saudi Arabia',
      'Senegal',
      'Serbia',
      'Seychelles',
      'Sierra Leone',
      'Singapore',
      'Slovakia',
      'Slovenia',
      'Solomon Islands',
      'Somalia',
      'South Africa',
      'Spain',
      'Sri Lanka',
      'Sudan',
      'Sudan, South',
      'Suriname',
      'Sweden',
      'Switzerland',
      'Syria',
      'Taiwan',
      'Tajikistan',
      'Tanzania',
      'Thailand',
      'Togo',
      'Tonga',
      'Trinidad and Tobago',
      'Tunisia',
      'Turkey',
      'Turkmenistan',
      'Tuvalu',
      'Uganda',
      'Ukraine',
      'United Arab Emirates',
      'United Kingdom',
      'United States',
      'Uruguay',
      'Uzbekistan',
      'Vanuatu',
      'Vatican City',
      'Venezuela',
      'Vietnam',
      'Yemen',
      'Zambia',
      'Zimbabwe'
    ],
    country: '',
    referredBy: '',
    seed: '',
    referredByError: [],
    countryError: [],
    seedError: [],
    doubleName: 'mdw95.3bot'
  }),

  methods: {
    async initialize3Bot () {
      if (!this.country) {
        this.countryError.push('Please select a country.')
        return
      }

      var userDataResponse

      try {
        userDataResponse = (await window.userService.getUserData(this.doubleName))
      } catch (error) {
        console.log(error)
        // Handle the error that the use cannot be found.
        return
      }

      var referredUserDataResponse

      if (this.referredBy) {
        try {
          referredUserDataResponse = (await window.userService.getUserData(this.referredBy))
        } catch (error) {
          console.log(error)
          this.referredByError.push('Could not find referred name.')
          return
        }
      }

      var userDataKeys

      if (this.seed) {
        try {
          this.seed = this.seed.replace(/[^a-zA-Z ]/g, '').toLowerCase().trim().replace(/\s\s+/g, ' ')
          userDataKeys = await this.generateKeys(this.seed)
        } catch (error) {
          console.log(error)
          this.seedError.push('Your seed phrase is invalid.')
          return
        }
      } else {
        this.seedError.push('Please enter your seed.')
        return
      }

      if (userDataResponse.data.publicKey === userDataKeys.publicKey) {
        console.log('We can now initialize ... ')

        console.log('Calculating wallet keys from main key ... ')

        const that = this
        pbkdf2(userDataKeys.privateKey, 'wallet.threefold.me', 1000, 32, 'sha256', async function (_error, result) {
          console.log(result)
          var b64encoded = nacl.util.encodeBase64(result)
          console.log(referredUserDataResponse)

          console.log('pbkdf2 Seed: ', b64encoded)
          console.log('Wallet URL: ', 'https://wallet.threefold.me/login#username=' + that.doubleName + '&derivedSeed=' + encodeURIComponent(b64encoded))
          const walletMnemonicSeed = that.generateMnemonicFromSeed(result)
          console.log('walletMnemonicSeed :', walletMnemonicSeed)
          console.log('generateKeys(walletMnemonicSeed) :', await that.generateKeys(walletMnemonicSeed))
        })
      }
    },

    generateKeys (phrase) {
      return new Promise((resolve, reject) => {
        try {
          var entropy = bip39.mnemonicToEntropy(phrase)
          const fromHexString = hexString => new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)))
          var keys = sodium.crypto_sign_seed_keypair(fromHexString(entropy))

          resolve({
            phrase,
            privateKey: nacl.util.encodeBase64(keys.privateKey),
            publicKey: nacl.util.encodeBase64(keys.publicKey)
          })
        } catch (error) {
          reject(error)
        }
      })
    },

    generateMnemonicFromSeed (seed) {
      return bip39.entropyToMnemonic(seed)
    },

    generateSeedFromMnemonic (mnemonic) {
      return bip39.mnemonicToEntropy(mnemonic)
    }
  }
}
