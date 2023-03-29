Lift($L$) can be determined by Lift Coefficient ($C_L$) like the following
equation.

$$
L = \frac{1}{2} \rho v^2 S C_L
$$

Basic sentence structure:

```mermaid
flowchart LR
    %% common structure:
    subgraph sentence
        direction LR
        head
        bridi-tail
        head ~~~ bridi-tail
    end
    subgraph head
        head-terms
        %% cu
        %% head-terms ~~~ cu
    end
    head-terms-- cu---bridi-tail
    
    %% input all words here:
    %% mi ~~~ ca ~~~ cu ~~~ selbri ~~~ do
    %%todo: automatically link all terms to selbri
    mi-->selbri
    ca-->selbri
    do-->selbri

    subgraph head-terms[terms]
        mi
        ca
        mi ~~~ ca
    end
    subgraph bridi-tail[tail]
        direction LR
        selbri[(tavla)]
        tail-terms
    end
    subgraph tail-terms
        do([do])
    end

```


Filling in sumti into terbricmi:

```mermaid
flowchart TB
    subgraph bridi
        x1[\x1/]
        selbri
        x2[\x2/]
    end
    subgraph sumti
        s1-.->x1
        s2-.->x2
    end

    %% input your sumti:
    s1[/mi\]
    s2[/do\]
    %% input your selbri
    selbri[(tavla)]

    style s1 fill:#6ff,stroke:#333,stroke-width:1px
    style s2 fill:#6ff,stroke:#333,stroke-width:1px
    style selbri fill:#fff,stroke:#333,stroke-width:1px
    style x1 fill:#ff6,stroke:#333,stroke-dasharray: 5 2
    style x2 fill:#ff6,stroke:#333,stroke-dasharray: 5 2
    style bridi fill:#fff,stroke:#333
```