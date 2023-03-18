# Git

Git push: enviando alterações locais para o remoto

Vamos imaginar um cenário que já existe um projeto no GitHub  e você precisa cloná-lo, então, o primeiro comando será:

- git clone *linkdorepositorio*

Feito isso, você pode criar uma branch para si com o comando:

- git checkout -b *nomedabranch*

Com isso, você já criou a sua branch e já pode prepará-la para “subir” para o repositório remoto, e para isso basta dar os comandos:

- git commit -m "Subindo Branch"

E agora chegamos no tão esperado git push! Aqui temos alguns usos específicos dele, nesse caso, estamos apenas subindo uma branch, logo, o comando a ser dado é o seguinte:

- git push -u origin *nomedabranch*

Como você está subindo apenas uma branch, você pode acrescentar o -u como mostra a imagem, pois você está criando e “subindo” uma nova branch para o repositório remoto.

Também temos outra sequência de comandos que antecedem o git push que é extremamente importante e muito utilizada.
Mas, mais uma vez, antes de realizar o push, é necessário dar alguns outros comandos, como:

para adicionar todos os arquivos editados faça:

- git add .

para adicionar arquivo a arquivo faça:

- git add *nomearquivo.txt*

depois que adicionar faça:

- git commit -m *"Subindo funcionalidade X"*
  
- git push origin *nomedabranch*

Veja que agora não precisamos mais do -u, pois estamos subindo alterações de arquivo e não apenas a branch.

Possíveis problemas encontrados ao realizar push e como solucioná-los?
Sem perceber, a pessoa dev pode começar a desenvolver e quando vai executar o comando git push o terminal devolve uma mensagem de erro,
falando que não é possível empurrar as alterações para o repositório remoto.

Isso pode ocorrer porque você não trocou de branch e ainda está na branch principal, a qual em alguns casos é “bloqueada”,
ou seja, você pode não ter permissão para enviar as suas alterações do repositório local direto para a branch principal.
Acredite, não ter acesso à branch principal pode ser muito bom!

Nesse caso, você pode executar o comando git status para verificar em qual branch está.

Outro problema que pode ocorrer e provavelmente pelo mesmo motivo citado acima é que você não criou uma branch e seu projeto não esta em nenhum ramo.

Para solucionar esse problema, basta executar os comandos:

- git checkout -b *nomedabranch*
  
Com esse comando, você criará uma nova branch, e, depois como vimos acima, basta enviar a sua branch com o comando:

- git push -u origin *nomedabranch*

Outro problema que pode ocorrer é commitar alterações na branch errada. Para solucionar esse problema, basta executar:

- git checkout *nomedabranch*

Veja que este comando é diferente do comando citado acima: aqui não usamos o -b, pois não estamos querendo criar uma
branch e sim ir para uma que já existe. Depois, faça:

- git merge *main*

Com esse comando, você estará mesclando os commits de uma branch com outra. Depois, execute novamente o comando git push para enviar suas alterações.

Por fim, corrija a branch que você enviou suas alterações sem querer com:

- git reset –hard

Outros problemas podem acabar surgindo fora esses abordados, mas, programar é isso: descobrir um problema novo a cada dia!
Entretanto, tenha em mente que tudo tem uma solução, basta acharmos ela.

Opções para usar com Git push

Temos algumas opções para utilizar com o git push, dependendo de nossas necessidades e urgência em termos o projeto no repositório remoto.
Porém, precisamos nos atentar para o uso de alguns comandos.

- git push -f

Em alguns casos, o git push é rejeitado, pois você pode estar compartilhando a branch com outra pessoa desenvolvedora que fez alguma alteração e
você não executou o comando git pull para trazer as alterações feitas por ela para o seu repositório local.
Portanto, ao tentar executar o comando git push, o git rejeitará a sua tentativa.
Isso ocorre para evitar que você sobrescreva acidentalmente as alterações do seu colega.

Portanto, utilize esse comando se você tiver absoluta certeza do que está fazendo ou se você estiver desenvolvendo em uma branch só sua,
pois assim não terá problemas caso seu arquivo seja sobrescrito pelo que você está tentando enviar.

- git push -u origin *nomedabranch*

Como falado acima, este comando é utilizado quando queremos enviar a branch que criamos para o repositório remoto. Isso criará um “elo”
entre o seu repositório local e o repositório remoto.

- git push –all

Com este comando, estamos empurrando todas as branchs, ou ramos, de uma vez só para o repositório remoto.

- git push –tags

Este comando enviará todas as marcações para o repositório remoto. Uma tag é uma marcação que aponta para pontos específicos do histórico do Git.
