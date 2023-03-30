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
    %%common settings
    subgraph bridi["relation"]
        x1[\"x#8321;"/]
        selbri
        x2[\"x#8322;"/]
    end
    subgraph sumti["list of sumti"]
        s1-.->x1
        s2-.->x2
    end
    classDef s fill:#6ff,stroke:#333,stroke-width:1px;
    class s1 s;
    class s2 s;
    class selbri s;
    classDef x fill:#ff6,stroke:#333,stroke-width:1px,stroke-dasharray: 5 2;
    class x1 x;
    class x2 x;
    style bridi fill:#fff,stroke:#333
    
    %%
    %% input your sumti:
    s1[/mi\]
    s2[/do\]
    %% input your selbri
    selbri[(tavla)]

```