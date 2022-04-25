### I hope they would work, I am not that familiar with bash scripting but I tried my best

#### To deploy the project  run dev-deploy.sh

#### Example Calls. Ok I know I had to write them as scripts but the functions use too many parameters and unfortunately near console is not that stable for example you need to use 3 quotes for a single quote to run the code with parameters

near call $CONTRACT init '''{"""owner""":"""afy.testnet"""}''' --accountId $CONTRACT

near call $CONTRACT create '''{"""info""":"""TRUE NEW""","""reference""":"""Trust me bro"""}''' --accountId afy.testnet

near call $CONTRACT getByRange '''{"""offset""":0,"""limit""":2}''' --accountId afy.testnet

near call $CONTRACT getVerified '''{"""offset""":0,"""limit""":2}''' --accountId afy.testnet

near call $CONTRACT verify '''{"""id""":2386102074}''' --accountId afy.testnet

near call $CONTRACT deny '''{"""id""":2267868453}''' --accountId afy.testnet

near call $CONTRACT testAuth({}) --accountId afy.testnet

near call $CONTRACT update '''{"""id""":SOME_ID_HERE, """updates""":{"""info""":"""SOMESTRING""", """reference""":"""SOMESTRING""","""isTrue""":false,"""hasChecked""":true} }''' --accountId afy.testnet

near call $CONTRACT delete '''{"""id""":1353935063}''' --accountId afy.testnet



{
  id: 827205569,
  info: 'Earth Is Flat!!',
  reference: 'Trust me bro',
  isTrue: false,
  hasChecked: false,
  postedBy: 'afy.testnet'
}